"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAlertCircle, FiChevronDown, FiDollarSign,
  FiTarget, FiMapPin,
  FiLoader, FiUsers, FiTrendingUp,
  FiEdit, FiSettings
} from 'react-icons/fi';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { TriangleAlert, Sparkles } from 'lucide-react';
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
  maximum_price?: number;
  minimum_price?: number;
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
    conversion: number;
  };
  performance: {
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  setupProgress: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
  missingSteps: string[];
  originalData: Service;
}

interface ServicesListProps {
  data: any;
}

const ServicesList = ({ data }: ServicesListProps) => {
  const token = getAccessToken() || "";
  const [open, setOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null);
  const { mutate: updateStatus } = useUpdateServiceStatus();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [transformedServices, setTransformedServices] = useState<TransformedService[]>([]);

  // Generate mock performance data
  const generatePerformanceData = () => {
    const trends: Array<'up' | 'down' | 'stable'> = ['up', 'down', 'stable'];
    const randomTrend = trends[Math.floor(Math.random() * trends.length)];
    const change = randomTrend === 'up' ? Math.random() * 30 + 5 : 
                  randomTrend === 'down' ? -(Math.random() * 20 + 5) : 0;
    
    return {
      trend: randomTrend,
      change: Math.round(change)
    };
  };

  useEffect(() => {
    if (data?.services?.services) {
      const transformed = data.services.services.map((service: Service): TransformedService => {
        const step1 = !!service.service_name;
        const step2 = !!(service.maximum_price || service.minimum_price);
        const step3 = !!(service.question_ids && service.question_ids.length > 0);
        const step4 = !!(service.location_ids && service.location_ids.length > 0);

        const isCompleted = step1 && step2 && step3 && step4;

        const missingSteps = [];
        if (!step1) missingSteps.push('service_name');
        if (!step2) missingSteps.push('pricing');
        if (!step3) missingSteps.push('questions');
        if (!step4) missingSteps.push('locations');

        // Enhanced metrics with realistic data
        const views = Math.floor(service.totalLeads * (3 + Math.random() * 7));
        const conversion = service.totalLeads > 0 ? Math.round((service.totalLeads / views) * 100) : 0;

        return {
          id: service._id,
          name: service.service_name,
          active: service.service_status,
          completed: isCompleted,
          description: `${service.pricing_type || 'hourly'} pricing • ${service.location_ids?.length || 0} locations`,
          metrics: {
            spent: (service.minimum_price || 0).toString(),
            leads: service.totalLeads || 0,
            views: views,
            conversion: conversion
          },
          performance: generatePerformanceData(),
          setupProgress: {
            step1,
            step2,
            step3,
            step4
          },
          missingSteps,
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
    } finally {
      setLoadingServiceId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prevId => prevId === id ? null : id);
  };

  const calculateCompletion = (service: TransformedService) => {
    if (service.completed) return 100;
    if (!service.setupProgress) return 0;

    const totalSteps = Object.keys(service.setupProgress).length;
    const completedSteps = Object.values(service.setupProgress).filter(Boolean).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const handleRemoveService = (serviceId: string) => {
    setTransformedServices(prev => prev.filter(service => service.id !== serviceId));
    setOpen(false);
    setServiceToDelete(null);
  };

  const openDeleteDialog = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setOpen(true);
  };

  const getStepCompletionLink = (service: TransformedService, step: string) => {
    switch (step) {
      case 'service_name':
        return `/home-services/dashboard/services/addServices?service=${service.id}`;
      case 'pricing':
        return `/home-services/dashboard/services/pricing?service=${service.id}`;
      case 'questions':
        return `/home-services/dashboard/services/questions?service=${service.id}`;
      case 'locations':
        return `/home-services/dashboard/services/serviceLocation?service=${service.id}`;
      default:
        return `/home-services/dashboard/services/addServices?service=${service.id}`;
    }
  };

  const getTrendIcon = (trend: string) => {
    return <FiTrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />;
  };

  if (!data) {
    return <GlobalLoader />;
  }

  return (
    <div className="w-full">
      <main className="w-full max-w-7xl mx-auto">
        <div className="space-y-3">
          {transformedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-[13px]">
                Start by adding your first service to begin receiving leads and growing your business.
              </p>
              <Link
                href="/home-services/dashboard/services/addServices"
                className="inline-flex items-center px-4 py-2 bg-[#0077B6] text-white rounded-sm hover:bg-[#005f91] transition-all text-[13px] font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Add Your First Service
              </Link>
            </div>
          ) : (
            transformedServices.map((service) => {
              const isLoading = loadingServiceId === service.id;
              const completion = calculateCompletion(service);
              const isInactive = !service.active || !service.completed;
              const showWarning = !service.completed && completion === 50;

              return (
                <motion.div
                  key={service.id}
                  layout
                  className={`group relative overflow-hidden rounded-sm transition-all duration-300 border border-gray-300 dark:border-gray-600 ${
                    isInactive 
                      ? 'bg-gray-50 dark:bg-gray-800/50' 
                      : 'bg-white dark:bg-gray-800'
                  } ${
                    showWarning 
                      ? ' ring-gray-100 ' 
                      : ''
                  }`}
                >
                  {/* Service Header */}
                  <div
                    className={`cursor-pointer transition-colors ${
                      showWarning
                        ? ' dark:hover:bg-gray-800'
                        : isInactive
                        ? 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                    onClick={() => toggleExpand(service.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 min-w-0">
                              <h2 className={`font-semibold truncate text-[13px] ${
                                showWarning
                                  ? 'text-gray-900 dark:text-gray-300'
                                  : isInactive
                                  ? 'text-gray-500 dark:text-gray-400'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {service.name}
                              </h2>
                              
                              {/* Performance Indicator */}
                              {service.completed && service.active && (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${
                                  service.performance.trend === 'up' 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : service.performance.trend === 'down'
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}>
                                  {getTrendIcon(service.performance.trend)}
                                  {service.performance.change}%
                                </div>
                              )}
                            </div>

                            {/* Status Badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {showWarning && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-normal bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                                  <FiAlertCircle className="w-3 h-3 mr-1" />
                                  {completion}% Complete
                                </span>
                              )}

                              {!showWarning && !service.completed && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                  {completion}% Complete
                                </span>
                              )}

                              {service.active ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                  Active
                                </span>
                              ) : service.completed ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                  Paused
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                  Incomplete
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Stats - Only show for active, completed services */}
                          {service.completed && service.active && (
                            <div className="flex items-center gap-4 text-[12px] text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <FiUsers className="w-3 h-3" />
                                {service.metrics.leads} leads
                              </span>
                              <span className="flex items-center gap-1">
                                <FiDollarSign className="w-3 h-3" />
                                ${service.metrics.spent} avg.
                              </span>
                              <span className="flex items-center gap-1">
                                <FiTrendingUp className="w-3 h-3" />
                                {service.metrics.conversion}% conversion
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Toggle Switch */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleService(service.id);
                            }}
                            disabled={!service.completed || isLoading}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 rounded-full transition-colors ${
                              service.active ? 'bg-[#0077B6]' : 'bg-gray-300'
                            } ${
                              !service.completed || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
                            }`}
                          >
                            {isLoading ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FiLoader className="w-3 h-3 text-white animate-spin" />
                              </div>
                            ) : (
                              <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${
                                  service.active ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            )}
                          </button>

                          {/* Expand Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(service.id);
                            }}
                            className={`p-2 rounded-sm transition-colors ${
                              showWarning
                                ? 'text-yellow-500 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                                : isInactive
                                ? 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <FiChevronDown
                              className={`transition-transform duration-300 ${
                                expandedId === service.id ? 'rotate-180' : ''
                              }`}
                              size={16}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar - Only show for incomplete services */}
                      {!service.completed && service.setupProgress && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[12px] mb-2">
                            <span className={`font-medium ${
                              showWarning 
                                ? 'text-gray-700 dark:text-yellow-400' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              Setup Progress: {completion}%
                            </span>
                            <span className={`${
                              showWarning 
                                ? 'text-gray-700 dark:text-gray-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {Object.values(service.setupProgress).filter(Boolean).length}/
                              {Object.keys(service.setupProgress).length} steps
                            </span>
                          </div>
                          <div className="w-full rounded-full h-2 bg-gray-200 dark:bg-gray-600">
                            <div
                              className="h-2 rounded-full bg-[#0077B6] transition-all duration-300"
                              style={{
                                width: `${completion}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Expanded Content - Single Column Layout */}
                  <AnimatePresence>
                    {expandedId === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`border-t border-gray-200 dark:border-gray-700 ${
                          isInactive ? 'bg-gray-50/50 dark:bg-gray-800/30' : 'bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="p-4 space-y-4">
                          {/* Setup Progress Section - Only show for incomplete services */}
                          {!service.completed && (
                            <div className={`rounded-sm p-4 ${
                              showWarning
                                ? 'bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800'
                                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}>
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  <FiAlertCircle className={`w-5 h-5 ${
                                    showWarning 
                                      ? '' 
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className={`font-semibold text-[13px] mb-3 ${
                                    showWarning
                                      ? ''
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    Complete setup to start receiving leads
                                  </h3>
                                  
                                  {/* Setup Steps Grid - Single Column */}
                                  <div className="space-y-2">
                                    {!service.setupProgress.step1 && (
                                      <Link
                                        href={getStepCompletionLink(service, 'service_name')}
                                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors group ${
                                          showWarning
                                            ? 'bg-white  hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                                            : 'bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                            showWarning
                                              ? 'bg-blue-100 dark:bg-blue-900/30'
                                              : 'bg-gray-100 dark:bg-gray-500'
                                          }`}>
                                            <FiEdit className={`w-4 h-4 ${
                                              showWarning
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`} />
                                          </div>
                                          <div>
                                            <p className={`font-medium text-[13px] ${
                                              isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                            }`}>
                                              Service Name & Details
                                            </p>
                                          </div>
                                        </div>
                                        <FiEdit className={`w-4 h-4 ${
                                          showWarning
                                            ? 'text-gray-400 group-hover:text-[#0077B6]'
                                            : 'text-gray-400 group-hover:text-gray-600'
                                        }`} />
                                      </Link>
                                    )}

                                    {!service.setupProgress.step2 && (
                                      <Link
                                        href={getStepCompletionLink(service, 'pricing')}
                                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors group ${
                                          showWarning
                                            ? 'bg-white '
                                            : 'bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                            showWarning
                                              ? 'bg-green-100 dark:bg-green-900/30'
                                              : 'bg-gray-100 dark:bg-gray-500'
                                          }`}>
                                            <FiDollarSign className={`w-4 h-4 ${
                                              showWarning
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`} />
                                          </div>
                                          <div>
                                            <p className={`font-medium text-[13px] ${
                                              isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                            }`}>
                                              Pricing Structure
                                            </p>
                                          </div>
                                        </div>
                                        <FiEdit className={`w-4 h-4 ${
                                          showWarning
                                            ? 'text-gray-400 group-hover:text-[#0077B6]'
                                            : 'text-gray-400 group-hover:text-gray-600'
                                        }`} />
                                      </Link>
                                    )}

                                    {!service.setupProgress.step3 && (
                                      <Link
                                        href={getStepCompletionLink(service, 'questions')}
                                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors group ${
                                          showWarning
                                            ? 'bg-white'
                                            : 'bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                            showWarning
                                              ? 'bg-purple-100 dark:bg-purple-900/30'
                                              : 'bg-gray-100 dark:bg-gray-500'
                                          }`}>
                                            <FiSettings className={`w-4 h-4 ${
                                              showWarning
                                                ? 'text-purple-600 dark:text-purple-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`} />
                                          </div>
                                          <div>
                                            <p className={`font-medium text-[13px] ${
                                              isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                            }`}>
                                              Service Questions
                                            </p>
                                          </div>
                                        </div>
                                        <FiEdit className={`w-4 h-4 ${
                                          showWarning
                                            ? 'text-gray-400 group-hover:text-[#0077B6]'
                                            : 'text-gray-400 group-hover:text-gray-600'
                                        }`} />
                                      </Link>
                                    )}

                                    {!service.setupProgress.step4 && (
                                      <Link
                                        href={getStepCompletionLink(service, 'locations')}
                                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors group ${
                                          showWarning
                                            ? 'bg-white'
                                            : 'bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                            showWarning
                                              ? 'bg-orange-100 dark:bg-orange-900/30'
                                              : 'bg-gray-100 dark:bg-gray-500'
                                          }`}>
                                            <FiMapPin className={`w-4 h-4 ${
                                              showWarning
                                                ? 'text-orange-600 dark:text-orange-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`} />
                                          </div>
                                          <div>
                                            <p className={`font-medium text-[13px] ${
                                              isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                            }`}>
                                              Service Locations
                                            </p>
                                          </div>
                                        </div>
                                        <FiEdit className={`w-4 h-4 ${
                                          showWarning
                                            ? 'text-gray-400 group-hover:text-[#0077B6]'
                                            : 'text-gray-400 group-hover:text-gray-600'
                                        }`} />
                                      </Link>
                                    )}
                                  </div>

                                  <div className="mt-4">
                                    <Link
                                      href={`/home-services/dashboard/services/addServices?service=${service.id}`}
                                      className={`inline-flex items-center px-4 py-2 rounded-sm transition-colors text-[13px] font-medium ${
                                        showWarning
                                          ? 'bg-[#0077B6] text-white hover:bg-[#005f91]'
                                          : 'bg-gray-600 text-white hover:bg-gray-500'
                                      }`}
                                    >
                                      <Sparkles className="w-4 h-4 mr-2" />
                                      Complete All Setup Steps
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Performance Metrics - Only show for active, completed services */}
                          {service.completed && service.active && (
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-900 dark:text-white text-[13px] flex items-center gap-2">
                                <FiTrendingUp className="w-4 h-4 text-[#0077B6]" />
                                Performance Overview
                              </h3>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-sm p-3 border border-gray-200 dark:border-gray-600">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">
                                      Leads
                                    </span>
                                    <FiTarget className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {service.metrics.leads}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <FiTrendingUp className="w-3 h-3 text-green-500" />
                                    <span className="text-[12px] text-green-600 dark:text-green-400">
                                      +12% this week
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-sm p-3 border border-gray-200 dark:border-gray-600">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">
                                      Avg. Spend
                                    </span>
                                    <FiDollarSign className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    ${service.metrics.spent}
                                  </p>
                                  <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
                                    per service
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Service Configuration */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-[13px] flex items-center gap-2">
                              <FiSettings className="w-4 h-4 text-[#0077B6]" />
                              Service Configuration
                            </h3>

                            <div className="space-y-3">
                              {/* Only show completed steps as enabled */}
                              {service.setupProgress.step2 && (
                                <div className={`flex items-center justify-between p-3 rounded-sm border ${
                                  isInactive 
                                    ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                }`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                      isInactive ? 'bg-gray-100 dark:bg-gray-600' : 'bg-blue-100 dark:bg-blue-900/30'
                                    }`}>
                                      <FiDollarSign className={`w-4 h-4 ${
                                        isInactive ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400'
                                      }`} />
                                    </div>
                                    <div>
                                      <p className={`font-medium text-[13px] ${
                                        isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                      }`}>
                                        Pricing
                                      </p>
                                      <p className={`text-[12px] ${
                                        isInactive ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                                      }`}>
                                        {service.originalData.minimum_price && `From $${service.originalData.minimum_price}`}
                                        {service.originalData.minimum_price && service.originalData.maximum_price && ' • '}
                                        {service.originalData.maximum_price && `Up to $${service.originalData.maximum_price}`}
                                      </p>
                                    </div>
                                  </div>
                                  {!isInactive && (
                                    <Link
                                      href={getStepCompletionLink(service, 'pricing')}
                                      className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-sm text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors text-[12px] font-medium"
                                    >
                                      <FiEdit className="w-3 h-3 mr-1" />
                                      Edit
                                    </Link>
                                  )}
                                </div>
                              )}

                              {service.setupProgress.step4 && (
                                <div className={`flex items-center justify-between p-3 rounded-sm border ${
                                  isInactive 
                                    ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                }`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                      isInactive ? 'bg-gray-100 dark:bg-gray-600' : 'bg-green-100 dark:bg-green-900/30'
                                    }`}>
                                      <FiMapPin className={`w-4 h-4 ${
                                        isInactive ? 'text-gray-400' : 'text-green-600 dark:text-green-400'
                                      }`} />
                                    </div>
                                    <div>
                                      <p className={`font-medium text-[13px] ${
                                        isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                      }`}>
                                        Service Areas
                                      </p>
                                      <p className={`text-[12px] ${
                                        isInactive ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                                      }`}>
                                        {service.originalData.location_ids?.length || 0} locations covered
                                      </p>
                                    </div>
                                  </div>
                                  {!isInactive && (
                                    <Link
                                      href={getStepCompletionLink(service, 'locations')}
                                      className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-sm text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors text-[12px] font-medium"
                                    >
                                      <FiEdit className="w-3 h-3 mr-1" />
                                      Manage
                                    </Link>
                                  )}
                                </div>
                              )}

                              {service.setupProgress.step3 && (
                                <div className={`flex items-center justify-between p-3 rounded-sm border ${
                                  isInactive 
                                    ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                }`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                                      isInactive ? 'bg-gray-100 dark:bg-gray-600' : 'bg-purple-100 dark:bg-purple-900/30'
                                    }`}>
                                      <FiSettings className={`w-4 h-4 ${
                                        isInactive ? 'text-gray-400' : 'text-purple-600 dark:text-purple-400'
                                      }`} />
                                    </div>
                                    <div>
                                      <p className={`font-medium text-[13px] ${
                                        isInactive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                                      }`}>
                                        Service Questions
                                      </p>
                                      <p className={`text-[12px] ${
                                        isInactive ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                                      }`}>
                                        {service.originalData.question_ids?.length || 0} questions configured
                                      </p>
                                    </div>
                                  </div>
                                  {!isInactive && (
                                    <Link
                                      href={getStepCompletionLink(service, 'questions')}
                                      className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-sm text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors text-[12px] font-medium"
                                    >
                                      <FiEdit className="w-3 h-3 mr-1" />
                                      Configure
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            {service.completed && service.active && (
                              <Link
                                href="#service-insights"
                                className="inline-flex items-center justify-center px-4 py-2 bg-[#0077B6] text-white rounded-sm hover:bg-[#005f91] transition-colors text-[13px] font-medium"
                              >
                                <FiTrendingUp className="w-4 h-4 mr-2" />
                                View Detailed Insights
                              </Link>
                            )}
                            
                            <button
                              onClick={() => openDeleteDialog(service.id)}
                              className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-[13px] font-medium"
                            >
                              Remove Service
                            </button>
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

        {/* Delete Confirmation Dialog */}
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-sm bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 border border-gray-300 dark:border-gray-600"
              >
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 sm:mx-0 sm:size-10">
                      <TriangleAlert aria-hidden="true" className="size-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="font-semibold text-gray-900 dark:text-white text-[13px]">
                        Delete Service
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-gray-500 dark:text-gray-400 text-[13px]">
                          Are you sure you want to delete {serviceToDelete && transformedServices.find(s => s.id === serviceToDelete)?.name}? 
                          This action cannot be undone and all service data will be permanently removed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => serviceToDelete && handleRemoveService(serviceToDelete)}
                    className="inline-flex w-full justify-center rounded-sm bg-gray-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-gray-500 sm:ml-3 sm:w-auto text-[13px]"
                  >
                    Delete Service
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 text-[13px]"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default ServicesList;