"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/home-services/onboarding/ProgressBar";
import { getAccessToken } from "@/app/api/axios";
import {
  useProServicesQuestions,
  useSubmitServiceAnswers
} from "@/hooks/RegisterPro/useRegister";

// --- Steps (consistent with onboarding process)
const ONBOARDING_STEPS = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Reviews" },
  { id: 3, name: "Preferences" },
  { id: 4, name: "Location" },
  { id: 5, name: "Payment" },
  { id: 6, name: "Background" },
];

// --- Types matching Mongoose model
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

// --- Updated AnswerPayload type
interface AnswerPayload {
  professional_id: string;
  service_id: string;
  question_id: string;
  answer: string | string[];
}

export default function MultiChoiceServiceForm() {
  const token = getAccessToken() || "";
  const router = useRouter();
  const [professionalId, setProfessionalId] = useState<string>("");
  const { data, isLoading, isPending: questionsLoading, error } = useProServicesQuestions(token);
  const { mutate: submitAnswers, isPending: isSubmitting } = useSubmitServiceAnswers(token);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const currentStep = 3;

  // --- Extract questions from the nested data structure
  const questions = React.useMemo(() => {
    if (!data?.services?.services?.[0]?.questions) return [];
    return data.services.services[0].questions as ServiceQuestion[];
  }, [data]);

  // --- Group questions by service_id
  const groupedData = React.useMemo(() => {
    if (!questions.length) return [];
    const grouped: Record<string, ServiceQuestion[]> = {};
    for (const q of questions) {
      if (!grouped[q.service_id]) grouped[q.service_id] = [];
      grouped[q.service_id].push(q);
    }
    return Object.entries(grouped).map(([service_id, questions]) => ({
      _id: service_id,
      questions,
    }));
  }, [questions]);

  // --- Initialize answers state
  useEffect(() => {
    if (!groupedData.length) return;
    const initial: Record<string, string | string[]> = {};
    for (const service of groupedData) {
      for (const q of service.questions) {
        if (!q._id) continue;
        if (q.form_type === "checkbox") {
          initial[q._id] = [];
        } else if (q.options?.length) {
          initial[q._id] = q.options[0];
        } else {
          initial[q._id] = "";
        }
      }
    }
    setAnswers(initial);

    // --- Load professionalId from localStorage
    const localData = localStorage.getItem("professionalData");
    if (localData) {
      const parseData = JSON.parse(localData);
      if (parseData.professional) {
        setProfessionalId(parseData.professional._id || "");
      }
    }
  }, [groupedData]);

  // --- Handle answer changes
  const handleAnswerChange = useCallback((id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (validationErrors[id]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }, [validationErrors]);

  // --- Validate answers
  const validateAnswers = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    for (const service of groupedData) {
      for (const q of service.questions) {
        if (q.required && (!answers[q._id] || (Array.isArray(answers[q._id]) && answers[q._id].length === 0) || answers[q._id] === "")) {
          errors[q._id] = "This field is required";
        }
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [answers, groupedData]);

  // --- Submit answers with service_id included
  const handleNext = useCallback(() => {
    if (!validateAnswers()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload: AnswerPayload[] = [];
    groupedData.forEach((service) => {
      service.questions.forEach((q) => {
        payload.push({
          professional_id: professionalId,
          service_id: service._id,
          question_id: q._id,
          answer: answers[q._id],
        });
      });
    });

    submitAnswers(payload);
  }, [answers, validateAnswers, submitAnswers, professionalId, groupedData]);

  // --- Field renderer
  const renderField = useCallback(
    (q: ServiceQuestion) => {
      const value = answers[q._id] ?? "";
      const error = validationErrors[q._id];

      switch (q.form_type) {
        case "checkbox":
          return (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={`${q._id}-cb-${i}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) && value.includes(opt)}
                    onChange={(e) => {
                      const newValue = e.target.checked ? [...(value as string[]), opt] : (value as string[]).filter((v) => v !== opt);
                      handleAnswerChange(q._id, newValue);
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-[#0077B6]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{opt}</span>
                </label>
              ))}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );

        case "radio":
          return (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={`${q._id}-rd-${i}`} className="flex items-center">
                  <input
                    type="radio"
                    name={q._id}
                    checked={value === opt}
                    onChange={() => handleAnswerChange(q._id, opt)}
                    className="h-4 w-4 text-[#0077B6] border-gray-300 focus:ring-[#0077B6]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{opt}</span>
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
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
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
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
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
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
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
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          );
      }
    },
    [answers, validationErrors, handleAnswerChange]
  );

  // --- Loading & error states
  if (isLoading || questionsLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-6 w-6 animate-spin text-[#0077B6]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">Failed to load questions.</p>;
  }

  // --- Render UI
  return (
    <div>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={ONBOARDING_STEPS.length}
        steps={ONBOARDING_STEPS}
        className="mb-8"
      />

      <div className="max-w-4xl mx-auto p-4 pb-20">
        <p className="text-sm text-gray-600 mb-6">
          Please answer the following service questions carefully.
        </p>

        <div className="space-y-6">
          {groupedData.length > 0 ? (
            groupedData.map((service) => (
              <div key={service._id} className="space-y-5">
                {service.questions.map((q) => (
                  <div key={q._id} className="pb-3 border-b border-gray-100 last:border-none">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">
                      {q.question_name}{" "}
                      {q.required && <span className="text-red-500">*</span>}
                    </h3>
                    {renderField(q)}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No service questions found.</p>
          )}
        </div>

        <div className="fixed bottom-6 right-6 flex gap-4 text-[13px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 py-2 px-5 rounded-[4px] font-medium hover:bg-gray-400 transition"
          >
            Back
          </button>

          <button
            type="button"
            disabled={isSubmitting || groupedData.length === 0}
            onClick={handleNext}
            className={`text-white py-2 px-6 rounded-[4px] transition duration-300 flex items-center justify-center gap-2 ${isSubmitting || groupedData.length === 0
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