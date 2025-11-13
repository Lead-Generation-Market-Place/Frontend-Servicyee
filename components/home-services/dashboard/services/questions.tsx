"use client";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getAccessToken } from "@/app/api/axios";
import { useSubmitServiceAnswers } from "@/hooks/RegisterPro/useRegister";
import GlobalLoader from "@/components/ui/global-loader";
import { useGetServicesQuestionByServiceId } from "@/hooks/useServices";
import { useSearchParams } from "next/navigation";

export interface ServiceQuestion {
  _id: string;
  service_id: string;
  question_name: string;
  form_type: "checkbox" | "radio" | "text" | "select" | "number" | "date";
  options: string[];
  required: boolean;
  order: number;
  active: boolean;
}

interface AnswerPayload {
  professional_id: string;
  service_id: string;
  question_id: string;
  answer: string | string[];
}

export default function MultiChoiceServiceForm() {
  const token = getAccessToken() || "";
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id") || "";

  const { data: questionsData, isLoading: questionsLoading, error } =
    useGetServicesQuestionByServiceId(token, serviceId);

  const { mutate: submitAnswers, isPending: isSubmitting } =
    useSubmitServiceAnswers(token);

  const questions = React.useMemo((): ServiceQuestion[] => {
    if (!questionsData?.data?.length) return [];
    return questionsData.data;
  }, [questionsData]);

  useEffect(() => {
    if (!questions.length) return;
    const initial: Record<string, string | string[]> = {};
    questions.forEach((q) => {
      if (!q._id) return;
      if (q.form_type === "checkbox") {
        initial[q._id] = [];
      } else if (q.options?.length) {
        initial[q._id] = q.options[0];
      } else {
        initial[q._id] = "";
      }
    });
    setAnswers(initial);
  }, [questions]);

  const handleAnswerChange = useCallback(
    (id: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
      if (validationErrors[id]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    },
    [validationErrors]
  );

  const validateAnswers = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    questions.forEach((q) => {
      const val = answers[q._id];
      if (
        q.required &&
        (!val ||
          (Array.isArray(val) && val.length === 0) ||
          (typeof val === "string" && val.trim() === ""))
      ) {
        errors[q._id] = "This field is required";
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [answers, questions]);

  const handleNext = useCallback(() => {
    if (!validateAnswers()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const professional_id = ""; // TODO: get from auth context
    const payload: AnswerPayload[] = questions.map((q) => ({
      professional_id,
      service_id: q.service_id,
      question_id: q._id,
      answer: answers[q._id],
    }));

    submitAnswers(payload, {
      onSuccess: () => {
        toast.success("Answers submitted successfully!");
      },
      onError: (error) => {
        toast.error("Failed to submit answers. Please try again.");
        console.error("Submission error:", error);
      },
    });
  }, [answers, validateAnswers, submitAnswers, questions]);

  const renderField = useCallback(
    (q: ServiceQuestion) => {
      const value = answers[q._id] ?? "";
      const error = validationErrors[q._id];

      const inputBase =
        "block w-full px-3 py-2 text-sm border rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700";

      switch (q.form_type) {
        case "checkbox":
          return (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={`${q._id}-cb-${i}`}
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) && value.includes(opt)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(value as string[]), opt]
                        : (value as string[]).filter((v) => v !== opt);
                      handleAnswerChange(q._id, newValue);
                    }}
                    className="h-4 w-4 text-[#0077B6] border-gray-300 dark:border-gray-600 rounded focus:ring-[#0077B6]"
                  />
                  <span className="ml-2 text-sm">{opt}</span>
                </label>
              ))}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        case "radio":
          return (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={`${q._id}-rd-${i}`}
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <input
                    type="radio"
                    name={q._id}
                    checked={value === opt}
                    onChange={() => handleAnswerChange(q._id, opt)}
                    className="h-4 w-4 text-[#0077B6] border-gray-300 dark:border-gray-600 focus:ring-[#0077B6]"
                  />
                  <span className="ml-2 text-sm">{opt}</span>
                </label>
              ))}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        case "select":
          return (
            <div>
              <select
                value={value as string}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                className={inputBase}
              >
                {q.options.map((opt, i) => (
                  <option key={`${q._id}-opt-${i}`} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        case "number":
          return (
            <div>
              <input
                type="number"
                value={value as string}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                className={inputBase}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        case "date":
          return (
            <div>
              <input
                type="date"
                value={value as string}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                className={inputBase}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        default:
          return (
            <div>
              <input
                type="text"
                value={value as string}
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                placeholder="Enter your answer"
                className={inputBase}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );
      }
    },
    [answers, validationErrors, handleAnswerChange]
  );

  if (questionsLoading) return <GlobalLoader />;
  if (error) return <p className="text-red-500 text-center mt-8">Failed to load questions.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4 pb-20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Please answer the following service questions carefully. There are{" "}
          {questions.length} question(s) to answer.
        </p>
        <div className="space-y-8">
          {questions.length > 0 ? (
            <div className="overflow-hidden ">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Service Questions
                  </h2>
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-[#0077B6] px-3 py-1 rounded-full text-sm font-medium">
                    {questions.length} question{questions.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {questions.map((q, qIndex) => (
                  <div
                    key={q._id}
                    className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-[#0077B6] rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {qIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3">
                          {q.question_name}
                          {q.required && <span className="text-red-500 ml-1">*</span>}
                        </h3>
                        {renderField(q)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No questions found
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Please check if there are any questions available for this service.
              </p>
            </div>
          )}
        </div>

        <div className="fixed bottom-6 right-6 flex gap-4 text-[13px]">
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting || questions.length === 0}
            className={`text-white py-2 px-6 rounded-[4px] transition duration-300 flex items-center justify-center gap-2 ${
              isSubmitting || questions.length === 0
                ? "bg-[#0077B6]/70 cursor-not-allowed"
                : "bg-[#0077B6] hover:bg-[#005f8e]"
            }`}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{isSubmitting ? "Submitting..." : "Next"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
