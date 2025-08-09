// components/HideBusinessDatePicker.tsx
import { useState } from 'react';
import { format, addDays, isAfter, isBefore, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { useRouter } from 'next/navigation';

const HideBusinessDatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter(); // Assuming you have a router for navigation

  const today = new Date();
  const maxDate = addDays(today, 30);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    if (isAfter(day, maxDate)) return;
    setSelectedDate(day);

  };

  const hideBusiness = () => {
    if (!selectedDate) return;
    setIsLoading(true);
    // Simulate API call
      setIsHidden(true);
      setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto rounded-sm p-5 dark:bg-gray-900 border dark:border-gray-300 transition-all duration-200">
      {isHidden ? (
        <div className="text-center py-8 animate-fade-in">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="mt-2 text-[13px] font-semibold text-gray-900 dark:text-white">Your business is now hidden</span>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Will be visible again on <span className="font-medium text-[#0077B6] dark:text-[#48CAE4]">
              {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </span>
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setIsHidden(false)}
              className="px-5 py-2.5 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-[#0077B6] dark:bg-[#48CAE4] hover:bg-[#005b8c] dark:hover:bg-[#3aa8d0] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] dark:focus:ring-[#48CAE4]"
            >
              Change Date
            </button>
            <button
            onClick={() => {
              router.push('/home-services/dashboard');}}
              className="px-5 py-2.5 text-sm font-medium rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hide your business</h2>
            <p className="text-gray-600 text-[13px] dark:text-gray-300 mt-2">
              You will not receive new leads until the date you select. You can hide your business for up to 30 days.
            </p>
            <a href="#" className="inline-flex items-center mt-2 text-sm font-medium text-[#0077B6] dark:text-[#48CAE4] hover:underline group">
              Learn more
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
            <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Select an end date</h3>
            
            <div className="mb-6">
              <div className="flex  items-center justify-between px-2 mb-4">
                <button
                  onClick={prevMonth}
                  disabled={isBefore(startOfMonth(currentMonth), startOfMonth(today))}
                  className="p-2 rounded-sm text-gray-500  hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button
                  onClick={nextMonth}
                  disabled={isAfter(startOfMonth(currentMonth), startOfMonth(maxDate))}
                  className="p-2 rounded-sm text-gray-500 hover:text-gray-700  dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm leading-6 text-center text-[13px] text-gray-900 dark:text-gray-400 font-medium">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm">
                {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                  <div key={`empty-start-${index}`} className="py-2" />
                ))}

                {daysInMonth.map((day) => {
                  const isDisabled = isBefore(day, today) || isAfter(day, maxDate);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, today);

                  return (
                    <button
                      key={day.toString()}
                      type="button"
                      onClick={() => handleDateClick(day)}
                      disabled={isDisabled}
                      className={`py-2 rounded-[4px] text-[12px] relative transition-colors
                        ${isSelected ? 'bg-[#0077B6] text-white dark:bg-[#48CAE4] dark:text-gray-900 font-medium' : ''}
                        ${isToday ? 'font-normal' : ''}
                        ${isDisabled ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-[#0077B6] hover:text-white dark:hover:bg-gray-700'}
                      `}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                      {isToday && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0077B6] dark:bg-[#48CAE4] rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={()=>router.back()}
                className="px-5 py-2.5 text-sm font-medium rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={hideBusiness}
                  disabled={!selectedDate || isLoading}
                  className={`px-5 py-2.5 text-sm font-medium rounded-sm text-white ${
                    selectedDate 
                      ? 'bg-[#0077B6] dark:bg-[#48CAE4] hover:bg-[#005b8c] dark:hover:bg-[#3aa8d0]' 
                      : 'bg-[#8acff5] dark:bg-gray-600 cursor-not-allowed'
                  } transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] dark:focus:ring-[#48CAE4]`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Hide my business'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HideBusinessDatePicker;