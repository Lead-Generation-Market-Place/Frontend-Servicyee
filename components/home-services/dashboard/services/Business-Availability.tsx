// components/HideBusinessDatePicker.tsx
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, addDays, isBefore, isAfter } from 'date-fns';
import { useBusinessAvailability } from '@/hooks/useBusinessAvailability';
import { getAccessToken } from '@/app/api/axios';
import { useProfesssionalProgress } from '@/hooks/RegisterPro/useRegister';
import GlobalLoader from '@/components/ui/global-loader';
import { useRouter } from 'next/navigation';

interface HideBusinessDatePickerProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const HideBusinessDatePicker = ({
  onSuccess,
  onCancel
}: HideBusinessDatePickerProps) => {
  const router = useRouter();
  const token = getAccessToken() || "";
  const { data, isLoading } = useProfesssionalProgress(token);
  const professional_id = data?._id;
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const { mutate: updateAvailability, isPending } = useBusinessAvailability(token);
  const today = new Date();
  const maxDate = addDays(today, 30);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const isDateSelectable = (date: Date): boolean => {
    return !isBefore(date, today) && !isAfter(date, maxDate);
  };



  const handleBack = () => {
    router.back();
  };

  const calculateDaysUntil = (date: Date): number => {
    const timeDiff = date.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  const handleDateClick = (day: Date) => {
    if (!isDateSelectable(day)) return;
    setSelectedDate(day);
  };
  const hideBusiness = () => {
    if (!selectedDate || !professional_id) return;
    const payload = {
      professional_id,
      isAvailable: false,
      hiddenUntil: selectedDate.toISOString(),
    };

    updateAvailability(payload, {
      onSuccess: () => {
        setIsHidden(true);
        onSuccess?.();
      },
    });
  };
  const quickDurations = [
    { days: 1, label: '24 hours' },
    { days: 3, label: '3 days' },
    { days: 7, label: '1 week' },
    { days: 14, label: '2 weeks' },
  ];
  const handleQuickSelect = (days: number) => {
    const newDate = new Date();
    newDate.setDate(today.getDate() + days);
    if (isDateSelectable(newDate)) {
      setSelectedDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    }
  };
  const calculateImpactMetrics = () => {
    if (!selectedDate) return null;
    const daysHidden = calculateDaysUntil(selectedDate);
    const weekendsHidden = Math.floor(daysHidden / 7) * 2;
    return {
      daysHidden,
      weekendsHidden,
      businessDaysHidden: daysHidden - weekendsHidden,
    };
  };
  const impactMetrics = calculateImpactMetrics();
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (isLoading) {
    return (
      <GlobalLoader></GlobalLoader>
    );
  }


  // Show error state if no professional ID
  if (!professional_id) {
    return (
      <div className="w-full max-w-xl mx-auto dark:bg-gray-900 dark:border-gray-700  p-6">
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Professional ID Not Found
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
            Unable to load your professional information. Please try again later.
          </p>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isHidden) {
    return (
      <div className="w-full max-w-xl mx-auto dark:bg-gray-900 dark:border-gray-700  p-6 transition-all duration-200">
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-sm bg-green-100 dark:bg-green-900/30 mb-4">
            <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Business Hidden Successfully
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
            Your business profile is now hidden and will automatically reappear on{' '}
            <span className="font-medium text-[#0077B6] dark:text-[#48CAE4]">
              {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </span>
          </p>

          {impactMetrics && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-sm p-3 mb-4">
              <h4 className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-2">
                Hidden Period Summary
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {impactMetrics.daysHidden}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Total Days</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {impactMetrics.businessDaysHidden}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Business Days</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {impactMetrics.weekendsHidden}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Weekends</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsHidden(false)}
              className="px-4 py-2 text-xs font-medium rounded-sm text-white bg-[#0077B6] dark:bg-[#48CAE4] hover:bg-[#005b8c] dark:hover:bg-[#3aa8d0] transition-colors"
            >
              Change Settings
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 text-xs font-medium rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto dark:bg-gray-900 dark:border-gray-700  p-6 transition-all duration-200">
      <div className="mb-5">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          Hide Your Business
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
          Temporarily pause new lead generation. You can hide your business for up to 30 days.
        </p>

        {/* Quick Select Buttons */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Hide Duration:
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickDurations.map(({ days, label }) => (
              <button
                key={days}
                onClick={() => handleQuickSelect(days)}
                className="px-3 py-1.5 text-xs rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
          Or Select Custom End Date
        </h3>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              disabled={!isDateSelectable(monthStart)}
              className="p-1.5 rounded-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={nextMonth}
              disabled={!isDateSelectable(addMonths(monthStart, 1))}
              className="p-1.5 rounded-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-900 dark:text-gray-400 font-medium mb-1">
            {dayHeaders.map((day) => (
              <div key={day} className="py-1.5">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="py-1.5" />
            ))}

            {daysInMonth.map((day) => {
              const isSelectable = isDateSelectable(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={!isSelectable}
                  className={`py-1.5 rounded-sm text-xs relative transition-all duration-200
                    ${isSelected
                      ? 'bg-[#0077B6] text-white dark:bg-[#48CAE4] dark:text-gray-900 font-medium scale-105'
                      : 'text-gray-900 dark:text-gray-100'
                    }
                    ${!isSelectable
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'hover:bg-[#0077B6] hover:text-white dark:hover:bg-gray-700 transform hover:scale-105'
                    }
                  `}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                  {isToday && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#0077B6] dark:bg-[#48CAE4] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={hideBusiness}
            disabled={!selectedDate || isPending || !professional_id}
            className={`px-4 py-2 text-xs font-medium rounded-sm text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] dark:focus:ring-[#48CAE4] ${selectedDate && !isPending && professional_id
              ? 'bg-[#0077B6] dark:bg-[#48CAE4] hover:bg-[#005b8c] dark:hover:bg-[#3aa8d0] shadow-sm hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              }`}
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Hiding Business...
              </>
            ) : (
              'Hide My Business'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HideBusinessDatePicker;