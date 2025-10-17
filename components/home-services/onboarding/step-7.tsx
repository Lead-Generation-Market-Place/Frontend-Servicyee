'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ProgressBar } from "@/components/home-services/onboarding/ProgressBar";
import { useBusinesAvailability } from '@/hooks/RegisterPro/useRegister';
import { getAccessToken } from '@/app/api/axios';

const ONBOARDING_STEPS = [
  { id: 1, name: 'Profile' },
  { id: 2, name: 'Reviews' },
  { id: 3, name: 'Preferences' },
  { id: 4, name: 'Location' },
  { id: 5, name: 'Payment' },
  { id: 6, name: 'Background' },
];

const defaultSchedule = [
  { dayOfWeek: 0, day: 'Sunday', shifts: [{ openTime: '00:00', closeTime: '00:00', isClosed: true }] },
  { dayOfWeek: 1, day: 'Monday', shifts: [{ openTime: '09:00', closeTime: '17:00', isClosed: false }] },
  { dayOfWeek: 2, day: 'Tuesday', shifts: [{ openTime: '09:00', closeTime: '17:00', isClosed: false }] },
  { dayOfWeek: 3, day: 'Wednesday', shifts: [{ openTime: '09:00', closeTime: '17:00', isClosed: false }] },
  { dayOfWeek: 4, day: 'Thursday', shifts: [{ openTime: '09:00', closeTime: '17:00', isClosed: false }] },
  { dayOfWeek: 5, day: 'Friday', shifts: [{ openTime: '09:00', closeTime: '17:00', isClosed: false }] },
  { dayOfWeek: 6, day: 'Saturday', shifts: [{ openTime: '00:00', closeTime: '00:00', isClosed: true }] },
];

const generateTimeOptions = () => {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export interface SaveAvailabilityResult {
  status: 'success' | 'error';
  message: string;
  details?: string | null;
}

// Define the payload type
export interface BusinessAvailabilityPayload {
  id: string; // professional ID
  schedule: string; // JSON string
  [key: string]: any;
}

export default function AvailabilityForm() {
  const token = getAccessToken() || "";
  const [businessName, setBusinessName] = useState<string>("");
  const [professionalId, setProfessionalId] = useState<string>("");
  const { mutate, isPending, isError, error } = useBusinesAvailability(token);
  const [selectedOption, setSelectedOption] = useState<'business' | 'anytime'>('business');
  const [currentStep] = useState(3);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Get ServiceId
  const params = useSearchParams();
  const serviceId = params.get('id');

  // Get Business Name and professional ID from Local Storage
  useEffect(() => {
    const localData = localStorage.getItem("professionalData");
    if (localData) {
      try {
        const parseData = JSON.parse(localData);
        if (parseData.professional) {
          setBusinessName(parseData.professional.business_name || "");
          setProfessionalId(parseData.professional._id || "");
        }
      } catch (error) {
        console.error('Error parsing professional data from localStorage:', error);
      }
    }
  }, []);

  const handleTimeChange = (
    dayIndex: number,
    shiftIndex: number,
    type: 'openTime' | 'closeTime',
    value: string
  ) => {
    setSchedule(prev =>
      prev.map((day, i) => {
        if (i !== dayIndex) return day;
        return {
          ...day,
          shifts: day.shifts.map((shift, j) => {
            if (j !== shiftIndex) return shift;
            return {
              ...shift,
              [type]: value,
              isClosed: value !== '00:00' ? false : shift.isClosed,
            };
          }),
        };
      })
    );
  };

  const handleAvailabilityToggle = (dayIndex: number, shiftIndex: number) => {
    setSchedule(prev =>
      prev.map((day, i) => {
        if (i !== dayIndex) return day;
        const newDay = { ...day };
        newDay.shifts = day.shifts.map((shift, j) => {
          if (j !== shiftIndex) return shift;
          const isClosed = !shift.isClosed;
          return {
            ...shift,
            isClosed,
            openTime: isClosed ? '00:00' : '09:00',
            closeTime: isClosed ? '00:00' : '17:00',
          };
        });
        return newDay;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalSchedule = schedule;
      if (selectedOption === 'anytime') {
        finalSchedule = defaultSchedule.map((day) => ({
          ...day,
          shifts: [{ openTime: '00:00', closeTime: '23:59', isClosed: false }],
        }));
      }

      // Build the payload
      const payload: BusinessAvailabilityPayload = {
        id: professionalId,
        schedule: JSON.stringify(finalSchedule),
      };

      // Convert payload to FormData
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      mutate(payload);

      // Navigate back if serviceId exists
      if (serviceId) {
        router.back();
      }

    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    router.back();
  };
  const isLoading = isPending || isSubmitting;
  return (
    <div>
      {!serviceId && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={ONBOARDING_STEPS.length}
          steps={ONBOARDING_STEPS}
          className="mb-8"
        />
      )}
      <div className="flex justify-center text-[13px] dark:bg-gray-900">
        <div className="w-full max-w-4xl dark:border-gray-700 overflow-hidden">
          <form ref={formRef} onSubmit={handleSubmit} className="sm:p-6 md:p-10 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-[#023E8A] dark:text-white mb-3">
              Set your availability for <span className="italic">{businessName}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-[13px] mb-5">
              Customers will only request jobs during the times you set.
            </p>

            {isError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error?.message || 'Failed to save availability. Please try again.'}
              </div>
            )}

            <div className="space-y-4">
              {/* Business Hours Option */}
              <div
                className={`border rounded-[4px] cursor-pointer p-4 transition-colors ${selectedOption === 'business'
                  ? 'border-[#0077B6] bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                onClick={() => setSelectedOption('business')}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="radio"
                    checked={selectedOption === 'business'}
                    readOnly
                    className="accent-[#0077B6]"
                  />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Set Business Availability</span>
                </div>

                {selectedOption === 'business' && (
                  <div className="space-y-3">
                    {schedule.map((day, dayIndex) => (
                      <div
                        key={day.dayOfWeek}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 border-b py-2 last:border-none border-gray-200 dark:border-gray-700"
                      >
                        <label
                          className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer min-w-[80px]"
                          htmlFor={`closed-${day.dayOfWeek}`}
                        >
                          <input
                            id={`closed-${day.dayOfWeek}`}
                            type="checkbox"
                            checked={day.shifts[0].isClosed}
                            onChange={() => handleAvailabilityToggle(dayIndex, 0)}
                            className="mr-2 accent-[#0077B6]"
                          />
                          Closed
                        </label>

                        <span className="min-w-[80px] text-gray-900 dark:text-gray-100 font-medium">
                          {day.day}
                        </span>

                        {!day.shifts[0].isClosed && (
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                            <select
                              value={day.shifts[0].openTime}
                              onChange={(e) => handleTimeChange(dayIndex, 0, 'openTime', e.target.value)}
                              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-colors"
                              disabled={isLoading}
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                            <span className="mx-1 text-gray-500 dark:text-gray-400">to</span>
                            <select
                              value={day.shifts[0].closeTime}
                              onChange={(e) => handleTimeChange(dayIndex, 0, 'closeTime', e.target.value)}
                              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-colors"
                              disabled={isLoading}
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Available Any Time Option */}
              <div
                className={`border rounded-[4px] cursor-pointer p-4 transition-colors ${selectedOption === 'anytime'
                  ? 'border-[#0077B6] bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                onClick={() => !isLoading && setSelectedOption('anytime')}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={selectedOption === 'anytime'}
                    readOnly
                    className="accent-[#0077B6]"
                  />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Available Any Time</span>
                </div>
                {selectedOption === 'anytime' && (
                  <p className="mt-4 text-green-600 dark:text-green-400">
                    You will be available 24 hours, every day.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-4 text-[13px]">
        <button
          onClick={handleBack}
          type="button"
          disabled={isLoading}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white mt-6 w-full text-[13px] py-2 px-5 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => formRef.current?.requestSubmit()}
          className={`mt-6 w-full text-white text-[13px] py-2 px-6 rounded-[4px] transition duration-300 flex items-center justify-center gap-2
            ${isLoading
              ? 'bg-[#0077B6]/70 cursor-not-allowed'
              : 'bg-[#0077B6] hover:bg-[#005f8e]'
            }`}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{isLoading ? 'Saving...' : 'Next'}</span>
        </button>
      </div>
    </div>
  );
}