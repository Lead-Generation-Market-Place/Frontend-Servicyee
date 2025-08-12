import { useState } from 'react';
import { Home, Clock, Calendar, Ruler, CheckCircle, ChevronDown, ChevronUp, Wrench } from 'lucide-react';

const PreferencesCard = () => {
  const [expanded, setExpanded] = useState(false);

  // Example data (can be fetched from props or API)
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
      answers: ['Loft insulation', 'Wall insulation'], // example of multiple answers
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
      highlight: true,
    },
  ];

  return (
    <div className=" overflow-hidden mt-4">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800">Customer Preferences</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#0077B6] text-xs font-medium flex items-center"
        >
          {expanded ? 'Show less' : 'Show more'}
          {expanded ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>

      {/* Preferences List */}
      <div className="divide-y divide-gray-100">
        {preferences.map((pref, index) => (
          <div
            key={index}
            className={`p-4 ${
              pref.highlight ? 'bg-blue-50/40 border-l-4 border-[#0077B6]' : ''
            }`}
          >
            <div className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-1 flex items-center">
              {pref.icon}
              {pref.label}
            </div>

            {pref.answers.length > 1 ? (
              <ul className="list-disc list-inside space-y-1">
                {pref.answers.map((ans, i) => (
                  <li
                    key={i}
                    className="text-gray-800 text-sm font-medium flex items-start"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{ans}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800 font-medium">{pref.answers[0]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Expanded section for extra details */}
      {expanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
          <h4 className="font-medium text-gray-700 text-sm mb-2">
            Extra Notes
          </h4>
          <p className="text-gray-600 text-xs">
            These preferences are based on customer input and may include
            multiple choices where applicable.
          </p>
        </div>
      )}
    </div>
  );
};

export default PreferencesCard;
