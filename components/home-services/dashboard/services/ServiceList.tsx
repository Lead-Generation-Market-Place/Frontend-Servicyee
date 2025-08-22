"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAlertCircle, FiChevronDown, FiDollarSign,
  FiTarget, FiEye, FiX, FiCheck, FiInfo,
  FiSettings, FiCalendar, FiMapPin, FiEdit2,
  FiExternalLink
} from 'react-icons/fi';

interface Service {
  id: number;
  name: string;
  active: boolean;
  completed: boolean;
  description: string;
  metrics?: {
    spent: string;
    leads: number;
    views: number;
  };
  setupProgress?: {
    questions: boolean;
    pricing: boolean;
    availability: boolean;
    serviceArea: boolean;
  };
}

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link';

const ProfessionalServicesDashboard = () => {
  const [open, setOpen] = useState(false)

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Basement Finishing or Remodeling",
      active: false, // Changed to false since it's not complete
      completed: false,
      description: "Transform your basement into a functional living space with our remodeling services.",
      metrics: {
        spent: "0",
        leads: 0,
        views: 0
      },
      setupProgress: {
        questions: true,
        pricing: false,
        availability: false,
        serviceArea: true
      }
    },
    {
      id: 2,
      name: "Kitchen Remodeling",
      active: true,
      completed: true,
      description: "Modern kitchen remodeling services to upgrade your cooking space.",
      metrics: {
        spent: "120",
        leads: 3,
        views: 24
      }
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, active: service.completed ? !service.active : false } : service
      )
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prevId => prevId === id ? null : id);
  };

  const calculateCompletion = (service: Service) => {
    if (service.completed) return 100;
    if (!service.setupProgress) return 0;

    const totalSteps = Object.keys(service.setupProgress).length;
    const completedSteps = Object.values(service.setupProgress).filter(Boolean).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  return (
    <div className="w-full min-h-screen">
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              className={`w-full rounded-lg overflow-hidden shadow-sm transition-all ${service.active ? '' : 'opacity-80'}`}
              style={{
                borderColor: service.active ? '' : 'gray-400',
                boxShadow: !service.completed ? '0 0 0 2px var(--error)/0.2' : '0 1px 3px rgba(0,0,0,0.1)',
                borderWidth: '1px'
              }}
            >
              {/* Service Header */}
              <div
                className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => toggleExpand(service.id)}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h2
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white"
                        >
                          {service.name}
                        </h2>
                        {!service.completed && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500"
                          >
                            <FiAlertCircle className="mr-1" /> Setup Required
                          </span>
                        )}
                        {!service.active && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {service.completed ? 'Paused' : 'Inactive'}
                          </span>
                        )}
                      </div>

                      {service.description && (
                        <p
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService(service.id);
                        }}
                        disabled={!service.completed}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 rounded-full transition-colors ${service.active ? 'bg-[#0077B6]' : 'bg-gray-300'} ${!service.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${service.active ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(service.id);
                        }}
                        className="transition text-gray-500 dark:text-gray-400"
                      >
                        <FiChevronDown
                          className={`transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`}
                          size={20}
                        />
                      </button>
                    </div>
                  </div>

                  {!service.completed && service.setupProgress && (
                    <div className="mt-3 sm:mt-4">
                      <div className="flex items-center justify-between text-xs mb-1.5 text-gray-500 dark:text-gray-400">
                        <span>Setup progress: {calculateCompletion(service)}%</span>
                        <span>
                          {Object.values(service.setupProgress).filter(Boolean).length}/
                          {Object.keys(service.setupProgress).length} steps
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2.5 bg-gray-200 dark:bg-gray-600">
                        <div
                          className="h-2.5 rounded-full bg-[#0077B6]"
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
                    className="px-4 sm:px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="space-y-6">
                        {/* Setup TriangleAlert for Incomplete Services */}
                        {!service.completed && (
                          <div
                            className="border-l-4 p-4 rounded-r flex border-red-500 bg-red-50 dark:bg-red-900/20"
                          >
                            <div className="flex-shrink-0">
                              <FiAlertCircle
                                className="h-5 w-5 text-red-500"
                              />
                            </div>
                            <div className="ml-3">
                              <h3
                                className="text-sm font-medium text-red-700 dark:text-red-400"
                              >
                                Setup incomplete
                              </h3>
                              <div className="mt-2 text-sm">
                                <p className="text-gray-600 dark:text-gray-300">
                                  Complete your service setup to start receiving leads.
                                </p>
                                {service.setupProgress && (
                                  <ul className="mt-3 space-y-2">
                                    {!service.setupProgress.pricing && (
                                      <li className="flex items-center gap-2">
                                        <FiX
                                          className="text-red-500"
                                        />
                                        <Link
                                          href="#pricing"
                                          className="hover:underline text-[#0077B6] dark:text-[#0077B6]"
                                        >
                                          Set Lead Price
                                        </Link>
                                      </li>
                                    )}
                                    {!service.setupProgress.availability && (
                                      <li className="flex items-center gap-2">
                                        <FiX
                                          className="text-red-500"
                                        />
                                        <Link
                                          href="#availability"
                                          className="hover:underline text-[#0077B6] dark:text-[#0077B6]"
                                        >
                                          Choose where you work
                                        </Link>
                                      </li>
                                    )}
                                    {service.setupProgress.questions && (
                                      <li className="flex items-center gap-2">
                                        <FiCheck
                                          className="text-green-500"
                                        />
                                        <span className="text-gray-900 dark:text-white">
                                          Set Targeting Preferences
                                        </span>
                                      </li>
                                    )}
                                    {service.setupProgress.serviceArea && (
                                      <li className="flex items-center gap-2">
                                        <FiCheck
                                          className="text-green-500"
                                        />
                                        <span className="text-gray-900 dark:text-white">
                                          Selecting Service
                                        </span>
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                              <div className="mt-4">
                                <Link
                                  href="#complete-setup"
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0077B6] hover:bg-[#0077B6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] transition"
                                >
                                  Complete Setup
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Activity Metrics */}
                        <div id="metrics">
                          <h3
                            className="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
                          >
                            Activity this week
                          </h3>

                          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.spent !== "0" ?
                                'border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-[#0077B6] dark:bg-[#0077B6]/30 dark:hover:bg-[#0077B6]/40'
                                : 'border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'}`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.spent !== "0" ?
                                  'bg-blue-100 text-[#0077B6] dark:bg-[#0077B6]/50 dark:text-blue-300'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400'}`}
                              >
                                <FiDollarSign size={18} />
                              </div>
                              <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">Spent</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.spent !== "0" ?
                                  'text-[#0077B6] dark:text-blue-300' : ''}`}
                              >
                                {service.metrics?.spent || "0"}
                              </p>
                              <Link
                                href="#spending-details"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Details <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.leads ?
                                'border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-900 dark:bg-green-900/30 dark:hover:bg-green-900/40'
                                : 'border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'}`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.leads ?
                                  'bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-300'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400'}`}
                              >
                                <FiTarget size={18} />
                              </div>
                              <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">Leads</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.leads ?
                                  'text-green-700 dark:text-green-300' : ''}`}
                              >
                                {service.metrics?.leads || 0}
                              </p>
                              <Link
                                href="#leads-details"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                View Leads <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.views ?
                                'border-purple-200 bg-purple-50 hover:bg-purple-100 dark:border-purple-900 dark:bg-purple-900/30 dark:hover:bg-purple-900/40'
                                : 'border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'}`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.views ?
                                  'bg-purple-100 text-purple-600 dark:bg-purple-800/50 dark:text-purple-300'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400'}`}
                              >
                                <FiEye size={18} />
                              </div>
                              <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">Views</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.views ?
                                  'text-purple-700 dark:text-purple-300' : ''}`}
                              >
                                {service.metrics?.views || 0}
                              </p>
                              <Link
                                href="#views-analytics"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Analytics <FiExternalLink size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full bg-gray-200 dark:bg-gray-600"></div>

                        {/* Pricing Section */}
                        <div className="space-y-4" id="pricing">
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2">
                            <div>
                              <h4
                                className="font-medium mb-1 text-gray-900 dark:text-white"
                              >
                                Pricing
                              </h4>
                              <p
                                className="text-sm text-gray-600 dark:text-gray-300"
                              >
                                Configure your pricing structure for this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-10"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80 self-start xs:self-auto text-[#0077B6] dark:text-[#0077B6]"
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div
                              className="border rounded-lg p-4 transition hover:border-blue-300 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#0077B6]/30 text-[#0077B6] dark:text-[#0077B6]"
                                >
                                  <FiDollarSign size={16} />
                                </div>
                                <h5
                                  className="font-medium text-gray-900 dark:text-white"
                                >
                                  What you pay
                                </h5>
                              </div>
                              <p
                                className="text-sm mb-2 text-gray-600 dark:text-gray-300"
                              >
                                Choose how much you pay per lead
                              </p>
                              {!service.setupProgress?.pricing ? (
                                <div
                                  className="text-sm flex items-center gap-1 text-red-500"
                                >
                                  <FiX />
                                  <span>Not configured</span>
                                </div>
                              ) : (
                                <p
                                  className="font-medium text-gray-900 dark:text-white"
                                >
                                  5 - 15 Credits Per Lead
                                </p>
                              )}
                            </div>

                            <div
                              className="border rounded-lg p-4 transition hover:border-green-300 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                >
                                  <FiDollarSign size={16} />
                                </div>
                                <h5
                                  className="font-medium text-gray-900 dark:text-white"
                                >
                                  What customers pay
                                </h5>
                              </div>
                              <p
                                className="text-sm mb-2 text-gray-600 dark:text-gray-300"
                              >
                                Your service pricing
                              </p>
                              {!service.setupProgress?.pricing ? (
                                <div
                                  className="text-sm flex items-center gap-1 text-red-500"
                                >
                                  <FiX />
                                  <span>Not configured</span>
                                </div>
                              ) : (
                                <p
                                  className="font-medium text-gray-900 dark:text-white"
                                >
                                  5 - 10 Credits
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full bg-gray-200 dark:bg-gray-600"></div>

                        {/* Availability Section */}
                        <div className="space-y-4" id="availability">
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2">
                            <div>
                              <h4
                                className="font-medium mb-1 text-gray-900 dark:text-white"
                              >
                                Availability
                              </h4>
                              <p
                                className="text-sm text-gray-600 dark:text-gray-300"
                              >
                                Set when you are available for this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-7"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80 self-start xs:self-auto text-[#0077B6] dark:text-[#0077B6]"
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          {!service.setupProgress?.availability ? (
                            <div
                              className="p-4 rounded-lg border text-center transition hover:border-blue-300 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                            >
                              <FiCalendar
                                className="mx-auto mb-2 text-gray-500 dark:text-gray-400"
                                size={20}
                              />
                              <Link
                                href="#set-availability"
                                className="text-sm inline-flex items-center justify-center gap-1 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Configure availability <FiExternalLink size={12} />
                              </Link>
                            </div>
                          ) : (
                            <div>
                              <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                  <div
                                    key={i}
                                    className="text-center py-2 rounded"
                                    style={{
                                      backgroundColor: i < 5 ?
                                        'var(--success-bg)' : 'var(--background)',
                                      color: i < 5 ? 'var(--success)' : 'var(--text-secondary)'
                                    }}
                                  >
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                <p>Available: Monday - Friday, 8am - 5pm</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="h-px w-full bg-gray-200 dark:bg-gray-600"></div>

                        {/* Service Area Section */}
                        <div className="space-y-4" id="service-area">
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2">
                            <div>
                              <h4
                                className="font-medium mb-1 text-gray-900 dark:text-white"
                              >
                                Service Area
                              </h4>
                              <p
                                className="text-sm text-gray-600 dark:text-gray-300"
                              >
                                Areas where you provide this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-9"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80 self-start xs:self-auto text-[#0077B6] dark:text-[#0077B6]"
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          {service.setupProgress?.serviceArea ? (
                            <div
                              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#0077B6]/30 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                <FiMapPin size={16} />
                              </div>
                              <span
                                className="text-sm text-gray-900 dark:text-white"
                              >
                                Within 25 miles of 22041
                              </span>
                            </div>
                          ) : (
                            <div
                              className="p-4 rounded-lg border text-center transition hover:border-blue-300 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                            >
                              <Link
                                href="#set-service-area"
                                className="text-sm inline-flex items-center justify-center gap-1 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Configure service area <FiExternalLink size={12} />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className="h-px w-full bg-gray-200 dark:bg-gray-600"></div>

                        {/* Service Settings */}
                        <div className="space-y-4">
                          <h4
                            className="font-medium text-gray-900 dark:text-white"
                          >
                            Service Settings
                          </h4>

                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#0077B6]/30 text-[#0077B6] dark:text-[#0077B6]"
                                >
                                  <FiSettings size={16} />
                                </div>
                                <div>
                                  <h5
                                    className="text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Advanced targeting
                                  </h5>
                                  <p
                                    className="text-xs text-gray-600 dark:text-gray-300"
                                  >
                                    Refine the types of jobs you receive
                                  </p>
                                </div>
                              </div>
                              <Link
                                href="#targeting-settings"
                                className="text-sm flex items-center gap-1 transition hover:opacity-80 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Configure <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className="flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#0077B6]/30 text-[#0077B6] dark:text-[#0077B6]"
                                >
                                  <FiInfo size={16} />
                                </div>
                                <div>
                                  <h5
                                    className="text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Service description
                                  </h5>
                                  <p
                                    className="text-xs text-gray-600 dark:text-gray-300"
                                  >
                                    Edit how your service appears to customers
                                  </p>
                                </div>
                              </div>
                              <Link
                                href="#edit-description"
                                className="text-sm flex items-center gap-1 transition hover:opacity-80 text-[#0077B6] dark:text-[#0077B6]"
                              >
                                Edit <FiExternalLink size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full bg-gray-200 dark:bg-gray-600"></div>

                        {/* Remove Service Button */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
                          <Link
                            href="#service-insights"
                            className="text-sm flex items-center gap-1 transition hover:opacity-80 text-[#0077B6] dark:text-[#0077B6]"
                          >
                            View detailed insights for this service <FiExternalLink size={12} />
                          </Link>

                          <div className="flex justify-end">
                            <button
                              onClick={() => setOpen(true)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                            >
                              Remove this service
                            </button>
                            <Dialog open={open} onClose={setOpen} className="relative z-50">
                              <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                              />

                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel
                                    transition
                                    className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                  >
                                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                          <TriangleAlert aria-hidden="true" className="size-6 text-red-600" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                          <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                            Delete Service
                                          </DialogTitle>
                                          <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              Are you sure you want to delete this service? This action cannot be undone.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                      >
                                        Delete
                                      </button>
                                      <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfessionalServicesDashboard;