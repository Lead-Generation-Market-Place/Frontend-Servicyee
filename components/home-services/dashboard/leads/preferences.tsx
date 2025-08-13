'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
  Home,
  Clock,
  Calendar,
  Ruler,
  CheckCircle,
  ChevronDown,
  Wrench,
} from 'lucide-react';

const preferences = [
  {
    label: 'Property Type',
    icon: <Home className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: ['House'],
  },
  {
    label: 'Service Required',
    icon: <Wrench className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: ['Install new insulation'],
  },
  {
    label: 'Insulation Type(s)',
    icon: <Wrench className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: ['Loft insulation', 'Wall insulation'],
  },
  {
    label: 'Property Built',
    icon: <Calendar className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: ['1920-1979'],
  },
  {
    label: 'Completion Timeline',
    icon: <Clock className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: ['As soon as possible'],
  },
  {
    label: 'Additional Details',
    icon: <Ruler className="h-4 w-4 text-[#0077B6] mr-2" />,
    answers: [
      'I have had 10 sq ft boarded already and need the rest doing, about 7 sq ft',
    ],
  },
];

export default function PreferencesCard() {
  return (
    <div className="px-4 text-xs text-gray-800 dark:text-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Customer Preferences
      </h2>

      <div className="space-y-2">
        {preferences.map((pref, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <div
                className={`border border-gray-300 dark:border-gray-700 rounded-sm bg-white dark:bg-gray-800 shadow-sm`}
              >
                <Disclosure.Button className="w-full flex justify-between items-start px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1 mb-1">
                      {pref.icon}
                      {idx + 1}. {pref.label}
                    </p>
                    <p className="text-[10px] text-gray-500 text-[12px] dark:text-gray-400">
                      {pref.answers.length > 0
                        ? pref.answers.join(', ')
                        : 'No answer provided'}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 mt-1 text-[#0077B6] dark:text-[#90cdf4] transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-4 pt-1">
                  {pref.answers.length > 1 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {pref.answers.map((ans, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-800 dark:text-gray-200"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{ans}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 text-[12px]">
                      {pref.answers[0]}
                    </p>
                  )}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      <div className="mt-6 text-[10px] text-gray-600 dark:text-gray-400">
        These preferences are based on customer input and may include multiple choices where applicable.
      </div>
    </div>
  );
}
