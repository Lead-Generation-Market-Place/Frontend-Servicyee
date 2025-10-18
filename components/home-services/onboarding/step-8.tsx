"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/home-services/onboarding/ProgressBar";
import { getAccessToken } from "@/app/api/axios";
import { useProServicesQuestions } from "@/hooks/RegisterPro/useRegister";

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

async function submitAnswers(data: { question_id: string; answer: string | string[] }[]) {
  console.log("Answers submitted:", data);
  return { success: true };
}

export default function MultiChoiceServiceForm() {
  const token = getAccessToken() || "";
  const router = useRouter();
  const { data, isLoading, isPending, error } = useProServicesQuestions(token);
  console.log("Fetched data:", data);

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const currentStep = 3;

  const groupedData = React.useMemo(() => {
    if (!data?.data?.length) return [];
    const grouped: Record<string, ServiceQuestion[]> = {};

    for (const q of data.data) {
      if (!grouped[q.service_id]) grouped[q.service_id] = [];
      grouped[q.service_id].push(q);
    }

    return Object.entries(grouped).map(([service_id, questions]) => ({
      _id: service_id,
      questions,
    }));
  }, [data]);

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
  }, [groupedData]);

  const handleAnswerChange = useCallback((id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleNext = useCallback(async () => {
    try {
      const payload = Object.entries(answers).map(([question_id, answer]) => ({
        question_id,
        answer,
      }));

      const result = await submitAnswers(payload);
      if (!result.success) {
        toast.error("Failed to submit answers");
        return;
      }

      router.prefetch("/home-services/dashboard/services/step-9");
      router.push("/home-services/dashboard/services/step-9");
    } catch (err) {
      toast.error(`An error occurred: ${(err as Error).message}`);
    }
  }, [answers, router]);

  // --- Field Renderer
  const renderField = useCallback(
    (q: ServiceQuestion) => {
      const value = answers[q._id] ?? "";

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
                      const newValue = e.target.checked
                        ? [...(value as string[]), opt]
                        : (value as string[]).filter((v) => v !== opt);
                      handleAnswerChange(q._id, newValue);
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-[#0077B6]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{opt}</span>
                </label>
              ))}
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
            </div>
          );

        case "select":
          return (
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
          );

        case "number":
          return (
            <input
              type="number"
              value={value as string}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
            />
          );

        case "date":
          return (
            <input
              type="date"
              value={value as string}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
            />
          );

        default:
          return (
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              placeholder="Enter your answer"
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#0077B6]"
            />
          );
      }
    },
    [answers, handleAnswerChange]
  );

  // --- Loading & Error states
  if (isLoading || isPending) {
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
          {groupedData.map((service) => (
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
          ))}
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
            disabled={isPending}
            onClick={handleNext}
            className={`text-white py-2 px-6 rounded-[4px] transition duration-300 flex items-center justify-center gap-2 ${
              isPending ? "bg-[#0077B6]/70 cursor-not-allowed" : "bg-[#0077B6] hover:bg-[#005f8e]"
            }`}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
