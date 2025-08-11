import React, { useState, useEffect } from "react";
import data from "./data.json";

interface Question {
  id: number;
  question: string;
  type: string;
  options?: string[];
}

interface Service {
  service_id: number;
  service: string;
  questions: Question[];
}

interface Answers {
  [key: number]: string | number | boolean;
}

interface ServiceQuestionProps {
  serviceId: number; // Changed to number type
}

const ServiceQuestion: React.FC<ServiceQuestionProps> = ({ serviceId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [selectedServiceData, setSelectedServiceData] =
    useState<Service | null>(null);

  // Find the service data based on the numeric serviceId prop
  useEffect(() => {
    const service = data.find((item) => item.service_id == serviceId);
    if (service) {
      setSelectedServiceData(service);
    }
  }, [serviceId]);
  const currentQuestion = selectedServiceData?.questions[currentQuestionIndex];

  const handleAnswer = (value: string | number | boolean) => {
    if (!currentQuestion || !selectedServiceData) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(newAnswers);

    // Move to next question or complete
    if (currentQuestionIndex < selectedServiceData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const renderInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "multiple_choice":
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="block w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        );
      case "yes_no":
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg"
            >
              No
            </button>
          </div>
        );
      case "number":
        return (
          <input
            type="number"
            onChange={(e) => handleAnswer(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter a number"
          />
        );
      case "date":
        return (
          <input
            type="date"
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  if (!selectedServiceData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-xs">
        <h2 className="text-sm font-bold mb-4">Service Not Found</h2>
        <p>No service found with ID: {serviceId}</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-xs">
        <h2 className="text-xl font-bold mb-4">Thank you for your answers!</h2>
        <div className="space-y-4">
          <h3 className="font-semibold">
            Service: {selectedServiceData.service}
          </h3>
          {selectedServiceData.questions.map((q) => (
            <div key={q.id} className="border-b pb-2">
              <p className="font-medium">{q.question}</p>
              <p className="text-gray-600">
                {answers[q.id]?.toString() || "Not answered"}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setAnswers({});
            setIsComplete(false);
          }}
          className="mt-6 px-4 py-2 bg-sky-500 text-white rounded-lg"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-xs">
      <div className="mb-4">
        <span className="text-xs text-gray-500">
          Service: {selectedServiceData.service}
        </span>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="bg-sky-600 h-2.5 rounded-full"
            style={{
              width: `${
                ((currentQuestionIndex + 1) /
                  selectedServiceData.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">
          Question {currentQuestionIndex + 1} of{" "}
          {selectedServiceData.questions.length}
        </span>
      </div>

      <h2 className="text-xl font-bold mb-6">{currentQuestion?.question}</h2>
      {renderInput()}

      {currentQuestionIndex > 0 && (
        <button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          className="mt-4 px-4 py-2 text-gray-600"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default ServiceQuestion;
