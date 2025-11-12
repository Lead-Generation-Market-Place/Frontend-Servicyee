// app/dashboard/ServiceList.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAlertCircle, FiChevronDown, FiDollarSign,
  FiTarget, FiX, FiCheck,
  FiExternalLink, FiMapPin, FiDollarSign as FiDollar,
  FiLoader
} from 'react-icons/fi';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import GlobalLoader from '@/components/ui/global-loader';
import { useUpdateServiceStatus } from '@/hooks/useServices';
import { getAccessToken } from '@/app/api/axios';

interface Location {
  _id: string;
  country?: string;
  city?: string;
  state?: string;
  address_line?: string;
  type: string;
  professional_id: string;
  service_id: string;
}

interface ServiceQuestion {
  _id: string;
  service_id: string;
  question_name: string;
  form_type: string;
  options: any[];
}

interface Service {
  _id: string;
  service_id: string;
  service_name: string;
  service_status: boolean;
  completed_tasks: number;
  totalLeads: number;
  pricing_type: string;
  location_ids: Location[];
  question_ids: ServiceQuestion[];
  professional_id: string;
  createdAt: string;
  updatedAt: string;
}

interface TransformedService {
  id: string;
  name: string;
  active: boolean;
  completed: boolean;
  description: string;
  metrics: {
    spent: string;
    leads: number;
    views: number;
  };
  setupProgress: {
    questions: boolean;
    pricing: boolean;
    availability: boolean;
    serviceArea: boolean;
  };
  originalData: Service;
}

interface ServicesListProps {
  data: any;
}

const ServicesList = ({ data }: ServicesListProps) => {
  const token = getAccessToken() || "";
  const [open, setOpen] = useState(false);
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null);
  const { mutate: updateStatus } = useUpdateServiceStatus();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [transformedServices, setTransformedServices] = useState<TransformedService[]>([]);

  useEffect(() => {
    if (data?.services?.services) {
      const transformed = data.services.services.map((service: Service): TransformedService => {
        const hasQuestions = service.question_ids && service.question_ids.length > 0;
        const hasPricing = !!service.pricing_type;
        const hasLocations = service.location_ids && service.location_ids.length > 0;

        const isCompleted = service.completed_tasks > 0 ||
          (hasPricing && hasLocations && hasQuestions);

        return {
          id: service._id,
          name: service.service_name,
          active: service.service_status,
          completed: isCompleted,
          description: `${service.service_name} - ${service.pricing_type || 'Not set'} pricing`,
          metrics: {
            spent: "0",
            leads: service.totalLeads || 0,
            views: 0
          },
          setupProgress: {
            questions: hasQuestions,
            pricing: hasPricing,
            availability: hasLocations,
            serviceArea: hasLocations
          },
          originalData: service
        };
      });
      setTransformedServices(transformed);
    }
  }, [data]);

  const toggleService = async (id: string) => {
    const service = transformedServices.find((s) => s.id === id);
    if (!service || !service.completed) return;

    setLoadingServiceId(id);
    
    try {
      await updateStatus({
        service_id: service.originalData.service_id,
        professional_id: service.originalData.professional_id,
        service_status: !service.active,
        token: token
      });

      setTransformedServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id
            ? {
                ...service,
                active: !service.active,
              }
            : service
        )
      );
    } catch (error) {
      console.error('Failed to update service status:', error);
    } finally {
      setLoadingServiceId(null);
    }
  };

  const toggleExpand = (id: string) => {
    const service = transformedServices.find((s) => s.id === id);
    // Only allow expanding if service is active or completed
    if (service && (service.active || service.completed)) {
      setExpandedId(prevId => prevId === id ? null : id);
    }
  };

  const calculateCompletion = (service: TransformedService) => {
    if (service.completed) return 100;
    if (!service.setupProgress) return 0;

    const totalSteps = Object.keys(service.setupProgress).length;
    const completedSteps = Object.values(service.setupProgress).filter(Boolean).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const handleRemoveService = (serviceId: string) => {
    console.log('Removing service:', serviceId);
    setTransformedServices(prev => prev.filter(service => service.id !== serviceId));
    setOpen(false);
  };

  const isServiceDisabled = (service: TransformedService) => !service.active;

  if (!data) {
    return <GlobalLoader />;
  }

  return (
    <div className="w-full">
      <main className="w-full max-w-7xl mx-auto">
        <div className="space-y-3">
          {transformedServices.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-gray-500 mb-3 text-[13px]">No services found</div>
              <Link
                href="/home-services/dashboard/services/addServices"
                className="inline-flex items-center px-3 py-1.5 bg-[#0077B6] text-white rounded-md hover:bg-[#005f91] transition-colors text-[13px]"
              >
                Add Your First Service
              </Link>
            </div>
          ) : (
            transformedServices.map((service) => {
              const disabled = isServiceDisabled(service);
              const isLoading = loadingServiceId === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  className={`w-full rounded-sm overflow-hidden shadow-xs transition-all border text-[13px] ${
                    service.active
                      ? 'border-gray-300 dark:border-gray-600'
                      : 'border-gray-200 dark:border-gray-700 opacity-80'
                  } ${
                    !service.completed ? 'ring-1 ring-red-200 dark:ring-red-900/30' : ''
                  } ${
                    disabled ? 'cursor-not-allowed bg-gray-50 dark:bg-gray-800/50' : ''
                  }`}
                >
                  {/* Service Header */}
                  <div
                    className={`transition-colors ${
                      disabled 
                        ? 'bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => !disabled && toggleExpand(service.id)}
                  >
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className={`font-semibold truncate text-[13px] ${
                              disabled 
                                ? 'text-gray-500 dark:text-gray-400' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {service.name}
                            </h2>
                            {!service.completed && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500 shrink-0">
                                <FiAlertCircle className="w-3 h-3 mr-0.5" /> Setup
                              </span>
                            )}
                            {!service.active && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 shrink-0">
                                {service.completed ? 'Paused' : 'Inactive'}
                              </span>
                            )}
                          </div>

                          <p className={`truncate text-[12px] ${
                            disabled 
                              ? 'text-gray-400 dark:text-gray-500' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {service.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleService(service.id);
                            }}
                            disabled={!service.completed || isLoading}
                            className={`relative inline-flex flex-shrink-0 h-5 w-9 rounded-full transition-colors ${
                              service.active ? 'bg-[#0077B6]' : 'bg-gray-300'
                            } ${
                              !service.completed || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            {isLoading ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FiLoader className="w-3 h-3 text-white animate-spin" />
                              </div>
                            ) : (
                              <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transform transition-transform ${
                                  service.active ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              !disabled && toggleExpand(service.id);
                            }}
                            disabled={disabled}
                            className={`transition ${
                              disabled 
                                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                                : 'text-gray-500 dark:text-gray-400 cursor-pointer'
                            }`}
                          >
                            <FiChevronDown
                              className={`transition-transform ${
                                expandedId === service.id ? 'rotate-180' : ''
                              }`}
                              size={16}
                            />
                          </button>
                        </div>
                      </div>

                      {!service.completed && service.setupProgress && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[11px] mb-1 text-gray-500 dark:text-gray-400">
                            <span>Setup: {calculateCompletion(service)}%</span>
                            <span>
                              {Object.values(service.setupProgress).filter(Boolean).length}/
                              {Object.keys(service.setupProgress).length}
                            </span>
                          </div>
                          <div className="w-full rounded-full h-1.5 bg-gray-200 dark:bg-gray-600">
                            <div
                              className="h-1.5 rounded-full bg-[#0077B6] transition-all duration-300"
                              style={{
                                width: `${calculateCompletion(service)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`px-3 pb-4 ${
                          disabled 
                            ? 'bg-gray-50 dark:bg-gray-800/50' 
                            : 'bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="space-y-4">
                            {/* Setup Alert for Incomplete Services */}
                            {!service.completed && (
                              <div className="border-l-2 p-3 rounded-r flex border-red-500 bg-red-50 dark:bg-red-900/20">
                                <div className="flex-shrink-0">
                                  <FiAlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                </div>
                                <div className="ml-2 flex-1">
                                  <h3 className="font-medium text-red-700 dark:text-red-400 text-[13px]">
                                    Setup incomplete
                                  </h3>
                                  <div className="mt-1">
                                    <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                                      Complete your service setup to start receiving leads.
                                    </p>
                                    {service.setupProgress && (
                                      <ul className="mt-2 space-y-1.5">
                                        {!service.setupProgress.pricing && (
                                          <li className="flex items-center gap-1.5 text-[12px]">
                                            <FiX className="text-red-500 w-3 h-3" />
                                            {disabled ? (
                                              <span className="text-gray-500 dark:text-gray-400">
                                                Set Lead Price
                                              </span>
                                            ) : (
                                              <Link
                                                href={`/home-services/dashboard/services/step-10?service=${service.id}`}
                                                className="hover:underline text-[#0077B6] dark:text-[#0077B6]"
                                              >
                                                Set Lead Price
                                              </Link>
                                            )}
                                          </li>
                                        )}
                                        {!service.setupProgress.availability && (
                                          <li className="flex items-center gap-1.5 text-[12px]">
                                            <FiX className="text-red-500 w-3 h-3" />
                                            {disabled ? (
                                              <span className="text-gray-500 dark:text-gray-400">
                                                Choose where you work
                                              </span>
                                            ) : (
                                              <Link
                                                href={`/home-services/dashboard/services/step-7?service=${service.id}`}
                                                className="hover:underline text-[#0077B6] dark:text-[#0077B6]"
                                              >
                                                Choose where you work
                                              </Link>
                                            )}
                                          </li>
                                        )}
                                        {service.setupProgress.questions && (
                                          <li className="flex items-center gap-1.5 text-[12px]">
                                            <FiCheck className="text-green-500 w-3 h-3" />
                                            <span className="text-gray-900 dark:text-white">
                                              Set Targeting Preferences
                                            </span>
                                          </li>
                                        )}
                                        {service.setupProgress.serviceArea && (
                                          <li className="flex items-center gap-1.5 text-[12px]">
                                            <FiCheck className="text-green-500 w-3 h-3" />
                                            <span className="text-gray-900 dark:text-white">
                                              Service Area Set
                                            </span>
                                          </li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                  <div className="mt-3">
                                    {disabled ? (
                                      <button
                                        disabled
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent font-medium rounded-md shadow-xs text-gray-400 bg-gray-200 dark:bg-gray-600 cursor-not-allowed text-[12px]"
                                      >
                                        Complete Setup
                                      </button>
                                    ) : (
                                      <Link
                                        href={`/home-services/dashboard/services/setup?service=${service.id}`}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent font-medium rounded-md shadow-xs text-white bg-[#0077B6] hover:bg-[#005f91] focus:outline-none focus:ring-1 focus:ring-[#0077B6] transition text-[12px]"
                                      >
                                        Complete Setup
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Activity Metrics */}
                            <div id="metrics">
                              <h3 className={`font-semibold mb-3 text-[13px] ${
                                disabled 
                                  ? 'text-gray-500 dark:text-gray-400' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                Activity this week
                              </h3>

                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className={`border rounded-sm p-2 text-center transition-all ${
                                  service.metrics.spent !== "0"
                                    ? 'border-blue-200 bg-blue-50 dark:border-[#0077B6] dark:bg-[#0077B6]/30'
                                    : 'border-gray-200 dark:border-gray-600'
                                } ${
                                  disabled 
                                    ? 'bg-gray-100 dark:bg-gray-700/50 opacity-60 cursor-not-allowed' 
                                    : service.metrics.spent !== "0"
                                      ? 'hover:bg-blue-100 dark:hover:bg-[#0077B6]/40'
                                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}>
                                  <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                    service.metrics.spent !== "0"
                                      ? 'bg-blue-100 text-[#0077B6] dark:bg-[#0077B6]/50 dark:text-blue-300'
                                      : 'bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                                  }`}>
                                    <FiDollarSign size={14} />
                                  </div>
                                  <p className="mb-0.5 text-gray-600 dark:text-gray-300 text-[12px]">Spent</p>
                                  <p className={`font-medium text-[13px] ${
                                    service.metrics.spent !== "0" ? 'text-[#0077B6] dark:text-blue-300' : ''
                                  }`}>
                                    {service.metrics.spent}
                                  </p>
                                  {disabled ? (
                                    <span className="text-[11px] mt-0.5 inline-flex items-center justify-center gap-0.5 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                                      Details <FiExternalLink size={10} />
                                    </span>
                                  ) : (
                                    <Link
                                      href="#spending-details"
                                      className="text-[11px] mt-0.5 inline-flex items-center justify-center gap-0.5 text-[#0077B6] dark:text-[#0077B6] hover:underline"
                                    >
                                      Details <FiExternalLink size={10} />
                                    </Link>
                                  )}
                                </div>

                                <div className={`border rounded-sm p-2 text-center transition-all ${
                                  service.metrics.leads
                                    ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/30'
                                    : 'border-gray-200 dark:border-gray-600'
                                } ${
                                  disabled 
                                    ? 'bg-gray-100 dark:bg-gray-700/50 opacity-60 cursor-not-allowed' 
                                    : service.metrics.leads
                                      ? 'hover:bg-green-100 dark:hover:bg-green-900/40'
                                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}>
                                  <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                    service.metrics.leads
                                      ? 'bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-300'
                                      : 'bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                                  }`}>
                                    <FiTarget size={14} />
                                  </div>
                                  <p className="mb-0.5 text-gray-600 dark:text-gray-300 text-[12px]">Leads</p>
                                  <p className={`font-medium text-[13px] ${
                                    service.metrics.leads ? 'text-green-700 dark:text-green-300' : ''
                                  }`}>
                                    {service.metrics.leads}
                                  </p>
                                  {disabled ? (
                                    <span className="text-[11px] mt-0.5 inline-flex items-center justify-center gap-0.5 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                                      View Leads <FiExternalLink size={10} />
                                    </span>
                                  ) : (
                                    <Link
                                      href="#leads-details"
                                      className="text-[11px] mt-0.5 inline-flex items-center justify-center gap-0.5 text-[#0077B6] dark:text-[#0077B6] hover:underline"
                                    >
                                      View Leads <FiExternalLink size={10} />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Pricing Section */}
                            <div id="pricing">
                              <h3 className={`font-semibold mb-3 text-[13px] ${
                                disabled 
                                  ? 'text-gray-500 dark:text-gray-400' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                Pricing
                              </h3>
                              <div className={`border rounded-sm p-3 ${
                                disabled 
                                  ? 'bg-gray-100 dark:bg-gray-700/50' 
                                  : 'bg-gray-50 dark:bg-gray-700'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className={`font-medium text-[13px] ${
                                      disabled 
                                        ? 'text-gray-500 dark:text-gray-400' 
                                        : 'text-gray-900 dark:text-white'
                                    }`}>
                                      {service.originalData.pricing_type || 'Not set'}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                                      Lead pricing type
                                    </p>
                                  </div>
                                  {disabled ? (
                                    <button
                                      disabled
                                      className="inline-flex items-center px-2 py-1 text-[12px] bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                    >
                                      <FiDollar className="w-3 h-3 mr-1" />
                                      Edit
                                    </button>
                                  ) : (
                                    <Link
                                      href={`/home-services/dashboard/services/step-10?service=${service.id}`}
                                      className="inline-flex items-center px-2 py-1 text-[12px] bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                                    >
                                      <FiDollar className="w-3 h-3 mr-1" />
                                      Edit
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Service Area Section */}
                            <div id="service-area">
                              <h3 className={`font-semibold mb-3 text-[13px] ${
                                disabled 
                                  ? 'text-gray-500 dark:text-gray-400' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                Service Area
                              </h3>
                              <div className={`border rounded-sm p-3 ${
                                disabled 
                                  ? 'bg-gray-100 dark:bg-gray-700/50' 
                                  : 'bg-gray-50 dark:bg-gray-700'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className={`font-medium text-[13px] ${
                                      disabled 
                                        ? 'text-gray-500 dark:text-gray-400' 
                                        : 'text-gray-900 dark:text-white'
                                    }`}>
                                      {service.setupProgress.serviceArea
                                        ? `${service.originalData.location_ids?.length || 0} locations`
                                        : 'Not set'
                                      }
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                                      Areas where you provide service
                                    </p>
                                  </div>
                                  {disabled ? (
                                    <button
                                      disabled
                                      className="inline-flex items-center px-2 py-1 text-[12px] bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                    >
                                      <FiMapPin className="w-3 h-3 mr-1" />
                                      Manage
                                    </button>
                                  ) : (
                                    <Link
                                      href={`/home-services/dashboard/services/step-7?service=${service.id}`}
                                      className="inline-flex items-center px-2 py-1 text-[12px] bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                                    >
                                      <FiMapPin className="w-3 h-3 mr-1" />
                                      Manage
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Remove Service Button & Detailed Insights */}
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                              {disabled ? (
                                <span className="text-[12px] flex items-center gap-1 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                                  View detailed insights <FiExternalLink size={10} />
                                </span>
                              ) : (
                                <Link
                                  href="#service-insights"
                                  className="text-[12px] flex items-center gap-1 transition hover:opacity-80 text-[#0077B6] dark:text-[#0077B6]"
                                >
                                  View detailed insights <FiExternalLink size={10} />
                                </Link>
                              )}

                              <div className="flex justify-end">
                                <button
                                  onClick={() => setOpen(true)}
                                  disabled={disabled}
                                  className={`inline-flex items-center px-3 py-1.5 border border-transparent font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-offset-1 transition text-[12px] ${
                                    disabled
                                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                                  }`}
                                >
                                  Remove service
                                </button>

                                {/* Delete Dialog */}
                                <Dialog open={open} onClose={setOpen} className="relative z-50">
                                  <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                                  />
                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                      <DialogPanel
                                        transition
                                        className="relative transform overflow-hidden rounded-sm bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                      >
                                        <div className="px-4 pt-4 pb-3 sm:p-4 sm:pb-3">
                                          <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-8">
                                              <TriangleAlert aria-hidden="true" className="size-5 text-red-600" />
                                            </div>
                                            <div className="mt-2 text-center sm:mt-0 sm:ml-3 sm:text-left">
                                              <DialogTitle as="h3" className="font-semibold text-gray-900 dark:text-white text-[13px]">
                                                Delete Service
                                              </DialogTitle>
                                              <div className="mt-1">
                                                <p className="text-gray-500 dark:text-gray-400 text-[12px]">
                                                  Are you sure you want to delete `{service.name}`? This action cannot be undone.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2.5 sm:flex sm:flex-row-reverse sm:px-4">
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveService(service.id)}
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-2 sm:w-auto text-[12px]"
                                          >
                                            Delete
                                          </button>
                                          <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => setOpen(false)}
                                            className="mt-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-1.5 font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-[12px]"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </DialogPanel>
                                    </div>
                                  </div>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default ServicesList;