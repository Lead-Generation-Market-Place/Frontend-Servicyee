import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

// Define TypeScript interfaces
interface Question {
  id: number;
  text: string;
  type: string;
  options: string[];
}

interface Service {
  id: number;
  name: string;
  questions: Question[];
}

interface UserInfo {
  email: string;
  phone: string;
  description: string;
  files: FileList | null;
}

interface QuestionerProps {
  serviceId: number;
  triggerText?: string;
  className?: string;
  trigger?: React.ReactNode;
}

// Sample data structure for services and questions
const sampleData = {
  services: [
    {
      id: 1,
      name: "Web Development",
      questions: [
        {
          id: 1,
          text: "What type of website do you need?",
          type: "mcq",
          options: [
            "E-commerce",
            "Blog",
            "Corporate Website",
            "Portfolio",
            "Other",
          ],
        },
        {
          id: 2,
          text: "What is your preferred technology stack?",
          type: "mcq",
          options: [
            "React/Next.js",
            "Vue/Nuxt.js",
            "Angular",
            "WordPress",
            "Custom PHP",
          ],
        },
        {
          id: 3,
          text: "What is your estimated timeline for completion?",
          type: "mcq",
          options: [
            "Less than 1 month",
            "1-3 months",
            "3-6 months",
            "More than 6 months",
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Graphic Design",
      questions: [
        {
          id: 1,
          text: "What type of design do you need?",
          type: "mcq",
          options: [
            "Logo",
            "Brochure",
            "Social Media Graphics",
            "Packaging",
            "Other",
          ],
        },
        {
          id: 2,
          text: "What is your preferred style?",
          type: "mcq",
          options: [
            "Minimalist",
            "Vintage",
            "Modern",
            "Playful",
            "Professional",
          ],
        },
      ],
    },
  ],
};

// Custom ProgressBar component since the UI library's Progress doesn't support indicatorClassName
const CustomProgressBar = ({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div
      className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}
    >
      <div
        className="bg-sky-600 dark:bg-sky-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const Questioner = ({
  serviceId,
  triggerText = "Request Quotation",
  className,
  trigger,
}: QuestionerProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [service, setService] = useState<Service | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    phone: "",
    description: "",
    files: null,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this from your data.json
    const selectedService = sampleData.services.find((s) => s.id === serviceId);
    if (selectedService) {
      setService(selectedService);
    }
    setCurrentStep(0);
    setResponses({});
    setUserInfo({
      email: "",
      phone: "",
      description: "",
      files: null,
    });
    setUploadedFileNames([]);
  }, [serviceId, isOpen]);

  const handleResponse = (questionId: number, answer: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (service) {
      // If we're on the last question, move to the user info step
      if (currentStep === service.questions.length - 1) {
        setCurrentStep(service.questions.length); // User info step
      }
      // If we're on the user info step, move to the review step
      else if (currentStep === service.questions.length) {
        setCurrentStep(service.questions.length + 1); // Review step
      }
      // Otherwise, move to the next question
      else if (currentStep < service.questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleUserInfoChange = (
    field: keyof UserInfo,
    value: string | FileList | null
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleUserInfoChange("files", files);
      const names = Array.from(files).map((file) => file.name);
      setUploadedFileNames(names);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting:", { responses, userInfo, serviceId });
    alert("Quotation request submitted successfully!");
    setIsOpen(false);
  };

  const progressValue = service
    ? (currentStep / (service.questions.length + 2)) * 100
    : 0;

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="default"
            className={`bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
          >
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-lg max-h-[100vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
          {/* Visually hidden DialogTitle for accessibility */}
          <DialogHeader className="sr-only">
            <DialogTitle>Request Quotation for {service.name}</DialogTitle>
          </DialogHeader>

          <div className="pt-0 pb-4">
            <CustomProgressBar value={progressValue} />
          </div>

          <div className="p-6 max-h-[100vh] overflow-y-auto">
            {currentStep < service.questions.length ? (
              // Question steps
              <div className="space-y-6">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {service.questions[currentStep].text}
                </h3>

                <RadioGroup
                  value={responses[service.questions[currentStep].id] || ""}
                  onValueChange={(value) =>
                    handleResponse(service.questions[currentStep].id, value)
                  }
                  className=""
                >
                  {service.questions[currentStep].options.map(
                    (option, index) => {
                      const isSelected =
                        responses[service.questions[currentStep].id] === option;
                      const optionId = `option-${currentStep}-${index}`;

                      return (
                        <Label
                          htmlFor={optionId}
                          key={index}
                          className={`flex items-center space-x-3 border p-4 rounded-md transition-colors duration-200 cursor-pointer ${
                            isSelected
                              ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600"
                          }`}
                        >
                          <RadioGroupItem
                            value={option}
                            id={optionId}
                            className="text-sky-600 border-gray-300 dark:border-gray-600"
                          />
                          <span className="text-sm font-normal text-gray-700 dark:text-gray-300 flex-1">
                            {option}
                          </span>
                        </Label>
                      );
                    }
                  )}
                </RadioGroup>

                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!responses[service.questions[currentStep].id]}
                    className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2"
                  >
                    {currentStep === service.questions.length - 1
                      ? "Continue"
                      : "Next"}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            ) : currentStep === service.questions.length ? (
              // User info step
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        handleUserInfoChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) =>
                        handleUserInfoChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      required
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Project Description
                    </Label>
                    <Textarea
                      id="description"
                      value={userInfo.description}
                      onChange={(e) =>
                        handleUserInfoChange("description", e.target.value)
                      }
                      placeholder="Please provide any additional details about your project..."
                      rows={4}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="files"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Upload Files (Optional)
                    </Label>
                    <Input
                      id="files"
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                    {uploadedFileNames.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Selected files:</span>
                        <ul className="list-disc list-inside mt-1">
                          {uploadedFileNames.map((name, index) => (
                            <li key={index}>{name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!userInfo.email || !userInfo.phone}
                    className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2"
                  >
                    Review
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              // Review step
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Review Your Quotation Request
                </h3>

                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Your Answers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.questions.map((question) => (
                      <div key={question.id} className="space-y-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {question.text}
                        </p>
                        <p className="text-sky-600 dark:text-sky-400">
                          {responses[question.id] || "No answer provided"}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Email:
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 ml-2">
                        {userInfo.email}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Phone:
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 ml-2">
                        {userInfo.phone}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Description:
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 block mt-1">
                        {userInfo.description || "None provided"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Files:
                      </span>
                      <span className="text-sky-600 dark:text-sky-400 ml-2">
                        {userInfo.files
                          ? `${userInfo.files.length} file(s) uploaded`
                          : "None"}
                      </span>
                    </p>
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    Submit Quotation Request
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Questioner;
