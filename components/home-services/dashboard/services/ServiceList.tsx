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
      active: true,
      completed: false,
      description: "Transform your basement into a functional living space with our remodeling services.",
      metrics: {
        spent: "$0",
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
        spent: "$120",
        leads: 3,
        views: 24
      }
    },

  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, active: !service.active } : service
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

  // Color palette
  const colors = {
    primary: '#0077B6',
    primaryDark: '#005F91',
    secondary: '#48CAE4',
    accent: '#00B4D8',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    background: '#F8FAFC',
    card: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0'
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              className={`w-full rounded-lg overflow-hidden shadow-sm transition-all ${service.active ? '' : ' border-gray-300 opacity-80'
                }`}
              style={{
                backgroundColor: colors.card,
                borderColor: service.active ? colors.primary : '',
                boxShadow: !service.completed ? `0 0 0 2px ${colors.error}20` : '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {/* Service Header */}
              <div
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(service.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h2
                          className="text-lg font-semibold"
                          style={{ color: colors.textPrimary }}
                        >
                          {service.name}
                        </h2>
                        {!service.completed && (
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: `${colors.error}15`, color: colors.error }}
                          >
                            <FiAlertCircle className="mr-1.5" /> Setup Required
                          </span>
                        )}
                        {!service.active && (
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: '#F1F5F9', color: colors.textSecondary }}
                          >
                            Paused
                          </span>
                        )}
                      </div>

                      {service.description && (
                        <p
                          className="text-sm"
                          style={{ color: colors.textSecondary }}
                        >
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService(service.id);
                        }}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 rounded-full transition-colors ${service.active ? 'bg-[#0077B6]' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${service.active ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(service.id);
                        }}
                        className="transition"
                        style={{ color: colors.textSecondary }}
                      >
                        <FiChevronDown
                          className={`transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`}
                          size={20}
                        />
                      </button>
                    </div>
                  </div>

                  {!service.completed && service.setupProgress && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: colors.textSecondary }}>
                        <span>Setup progress: {calculateCompletion(service)}%</span>
                        <span>
                          {Object.values(service.setupProgress).filter(Boolean).length}/
                          {Object.keys(service.setupProgress).length} steps
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{
                            width: `${calculateCompletion(service)}%`,
                            backgroundColor: colors.primary
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
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                      <div className="space-y-6">
                        {/* Setup TriangleAlert  for Incomplete Services */}
                        {!service.completed && (
                          <div
                            className="border-l-4 p-4 rounded-r flex"
                            style={{
                              backgroundColor: `${colors.error}08`,
                              borderColor: colors.error
                            }}
                          >
                            <div className="flex-shrink-0">
                              <FiAlertCircle
                                className="h-5 w-5"
                                style={{ color: colors.error }}
                              />
                            </div>
                            <div className="ml-3">
                              <h3
                                className="text-sm font-medium"
                                style={{ color: colors.error }}
                              >
                                Setup incomplete
                              </h3>
                              <div className="mt-2 text-sm">
                                <p style={{ color: colors.textSecondary }}>
                                  Complete your service setup to start receiving leads.
                                </p>
                                {service.setupProgress && (
                                  <ul className="mt-3 space-y-2">
                                    {!service.setupProgress.pricing && (
                                      <li className="flex items-center gap-2">
                                        <FiX
                                          style={{ color: colors.error }}
                                        />
                                        <Link
                                          href="#pricing"
                                          className="hover:underline"
                                          style={{ color: colors.primary }}
                                        >
                                          Set Lead Price
                                        </Link>
                                      </li>
                                    )}
                                    {!service.setupProgress.availability && (
                                      <li className="flex items-center gap-2">
                                        <FiX
                                          style={{ color: colors.error }}
                                        />
                                        <Link
                                          href="#availability"
                                          className="hover:underline"
                                          style={{ color: colors.primary }}
                                        >
                                          Choose where you work
                                        </Link>
                                      </li>
                                    )}
                                    {service.setupProgress.questions && (
                                      <li className="flex items-center gap-2">
                                        <FiCheck
                                          style={{ color: colors.success }}
                                        />
                                        <span style={{ color: colors.textPrimary }}>
                                          Set Targeting Preferences
                                        </span>
                                      </li>
                                    )}
                                    {service.setupProgress.serviceArea && (
                                      <li className="flex items-center gap-2">
                                        <FiCheck
                                          style={{ color: colors.success }}
                                        />
                                        <span style={{ color: colors.textPrimary }}>
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
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
                                  style={{
                                    backgroundColor: colors.primary
                                  }}
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
                            className="text-lg font-semibold mb-4"
                            style={{ color: colors.textPrimary }}
                          >
                            Activity this week
                          </h3>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.spent !== "$0" ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.spent !== "$0" ? 'bg-blue-100 text-[#0077B6]' : 'bg-gray-100 text-gray-500'
                                  }`}
                              >
                                <FiDollarSign size={18} />
                              </div>
                              <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Spent</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.spent !== "$0" ? 'text-[#0077B6]' : ''
                                  }`}
                              >
                                {service.metrics?.spent || "$0"}
                              </p>
                              <Link
                                href="#spending-details"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1"
                                style={{ color: colors.primary }}
                              >
                                Details <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.leads ? 'border-green-200 bg-green-50 hover:bg-green-100' : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.leads ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                  }`}
                              >
                                <FiTarget size={18} />
                              </div>
                              <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Leads</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.leads ? 'text-green-700' : ''
                                  }`}
                              >
                                {service.metrics?.leads || 0}
                              </p>
                              <Link
                                href="#leads-details"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1"
                                style={{ color: colors.primary }}
                              >
                                View Leads <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className={`border rounded-lg p-4 text-center transition-all ${service.metrics?.views ? 'border-purple-200 bg-purple-50 hover:bg-purple-100' : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                              <div
                                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${service.metrics?.views ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                                  }`}
                              >
                                <FiEye size={18} />
                              </div>
                              <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>Views</p>
                              <p
                                className={`font-medium text-lg ${service.metrics?.views ? 'text-purple-700' : ''
                                  }`}
                              >
                                {service.metrics?.views || 0}
                              </p>
                              <Link
                                href="#views-analytics"
                                className="text-xs mt-1.5 inline-flex items-center justify-center gap-1"
                                style={{ color: colors.primary }}
                              >
                                Analytics <FiExternalLink size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: colors.border }}></div>

                        {/* Pricing Section */}
                        <div className="space-y-4" id="pricing">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4
                                className="font-medium mb-1"
                                style={{ color: colors.textPrimary }}
                              >
                                Pricing
                              </h4>
                              <p
                                className="text-sm"
                                style={{ color: colors.textSecondary }}
                              >
                                Configure your pricing structure for this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-10"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80"
                              style={{ color: colors.primary }}
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div
                              className="border rounded-lg p-4 transition hover:border-blue-300"
                              style={{ borderColor: colors.border }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                                >
                                  <FiDollarSign size={16} />
                                </div>
                                <h5
                                  className="font-medium"
                                  style={{ color: colors.textPrimary }}
                                >
                                  What you pay
                                </h5>
                              </div>
                              <p
                                className="text-sm mb-2"
                                style={{ color: colors.textSecondary }}
                              >
                                Choose how much you pay per lead
                              </p>
                              {!service.setupProgress?.pricing ? (
                                <div
                                  className="text-sm flex items-center gap-1"
                                  style={{ color: colors.error }}
                                >

                                </div>
                              ) : (
                                <p
                                  className="font-medium"
                                  style={{ color: colors.textPrimary }}
                                >
                                  $15 - $25 per lead
                                </p>
                              )}
                            </div>

                            <div
                              className="border rounded-lg p-4 transition hover:border-green-300"
                              style={{ borderColor: colors.border }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: '#E6F7EE', color: colors.success }}
                                >
                                  <FiDollarSign size={16} />
                                </div>
                                <h5
                                  className="font-medium"
                                  style={{ color: colors.textPrimary }}
                                >
                                  What customers pay
                                </h5>
                              </div>
                              <p
                                className="text-sm mb-2"
                                style={{ color: colors.textSecondary }}
                              >
                                Your service pricing
                              </p>
                              {!service.setupProgress?.pricing ? (
                                <div
                                  className="text-sm flex items-center gap-1"
                                  style={{ color: colors.error }}
                                >

                                </div>
                              ) : (
                                <p
                                  className="font-medium"
                                  style={{ color: colors.textPrimary }}
                                >
                                  $2,500 - $5,000
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: colors.border }}></div>

                        {/* Availability Section */}
                        <div className="space-y-4" id="availability">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4
                                className="font-medium mb-1"
                                style={{ color: colors.textPrimary }}
                              >
                                Availability
                              </h4>
                              <p
                                className="text-sm"
                                style={{ color: colors.textSecondary }}
                              >
                                Set when you are available for this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-7"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80"
                              style={{ color: colors.primary }}
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          {!service.setupProgress?.availability ? (
                            <div
                              className="p-4 rounded-lg border text-center transition hover:border-blue-300 cursor-pointer"
                              style={{
                                backgroundColor: `${colors.background}`,
                                borderColor: colors.border
                              }}
                            >
                              <FiCalendar
                                className="mx-auto mb-2"
                                style={{ color: colors.textSecondary }}
                                size={20}
                              />
                              <Link
                                href="#set-availability"
                                className="text-sm inline-flex items-center justify-center gap-1"
                                style={{ color: colors.primary }}
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
                                      backgroundColor: i < 5 ? '#E6F7EE' : '#F8F9FA',
                                      color: i < 5 ? colors.success : colors.textSecondary
                                    }}
                                  >
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="text-sm" style={{ color: colors.textSecondary }}>
                                <p>Available: Monday - Friday, 8am - 5pm</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: colors.border }}></div>

                        {/* Service Area Section */}
                        <div className="space-y-4" id="service-area">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4
                                className="font-medium mb-1"
                                style={{ color: colors.textPrimary }}
                              >
                                Service Area
                              </h4>
                              <p
                                className="text-sm"
                                style={{ color: colors.textSecondary }}
                              >
                                Areas where you provide this service.
                              </p>
                            </div>
                            <Link
                              href="/home-services/dashboard/services/step-9"
                              className="text-sm flex items-center gap-1 transition hover:opacity-80"
                              style={{ color: colors.primary }}
                            >
                              <FiEdit2 size={16} /> Edit
                            </Link>
                          </div>

                          {service.setupProgress?.serviceArea ? (
                            <div
                              className="flex items-center gap-3 p-3 rounded-lg border"
                              style={{
                                borderColor: colors.border,
                                backgroundColor: `${colors.background}`
                              }}
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                              >
                                <FiMapPin size={16} />
                              </div>
                              <span
                                className="text-sm"
                                style={{ color: colors.textPrimary }}
                              >
                                Within 25 miles of 22041
                              </span>
                            </div>
                          ) : (
                            <div
                              className="p-4 rounded-lg border text-center transition hover:border-blue-300 cursor-pointer"
                              style={{
                                backgroundColor: `${colors.background}`,
                                borderColor: colors.border
                              }}
                            >
                              <Link
                                href="#set-service-area"
                                className="text-sm inline-flex items-center justify-center gap-1"
                                style={{ color: colors.primary }}
                              >
                                Configure service area <FiExternalLink size={12} />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: colors.border }}></div>

                        {/* Service Settings */}
                        <div className="space-y-4">
                          <h4
                            className="font-medium"
                            style={{ color: colors.textPrimary }}
                          >
                            Service Settings
                          </h4>

                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-50"
                              style={{ borderColor: colors.border }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: '#F0F9FF', color: colors.primary }}
                                >
                                  <FiSettings size={16} />
                                </div>
                                <div>
                                  <h5
                                    className="text-sm font-medium"
                                    style={{ color: colors.textPrimary }}
                                  >
                                    Advanced targeting
                                  </h5>
                                  <p
                                    className="text-xs"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    Refine the types of jobs you receive
                                  </p>
                                </div>
                              </div>
                              <Link
                                href="#targeting-settings"
                                className="text-sm flex items-center gap-1 transition hover:opacity-80"
                                style={{ color: colors.primary }}
                              >
                                Configure <FiExternalLink size={12} />
                              </Link>
                            </div>

                            <div
                              className="flex items-center justify-between p-3 rounded-lg transition hover:bg-gray-50"
                              style={{ borderColor: colors.border }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: '#F0F9FF', color: colors.primary }}
                                >
                                  <FiInfo size={16} />
                                </div>
                                <div>
                                  <h5
                                    className="text-sm font-medium"
                                    style={{ color: colors.textPrimary }}
                                  >
                                    Service description
                                  </h5>
                                  <p
                                    className="text-xs"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    Edit how your service appears to customers
                                  </p>
                                </div>
                              </div>
                              <Link
                                href="#edit-description"
                                className="text-sm flex items-center gap-1 transition hover:opacity-80"
                                style={{ color: colors.primary }}
                              >
                                Edit <FiExternalLink size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: colors.border }}></div>

                        {/* Remove Service Button */}
                        <div className="flex justify-between items-center">
                          <Link
                            href="#service-insights"
                            className="text-sm flex items-center gap-1 transition hover:opacity-80"
                            style={{ color: colors.primary }}
                          >
                            View detailed insights for this service <FiExternalLink size={12} />
                          </Link>

                          <div>
                            <button
                              onClick={() => setOpen(true)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
                              style={{
                                backgroundColor: `${colors.error}10`,
                                color: colors.error
                              }}
                            >
                              Remove this service
                            </button>
                            <Dialog open={open} onClose={setOpen} className="relative z-10">
                              <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                              />

                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel
                                    transition
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                  >
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                          <TriangleAlert aria-hidden="true" className="size-6 text-red-600" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                          <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Delete Service 
                                          </DialogTitle>
                                          <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                              Are you sure you want to delete this service? This action cannot be undone.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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