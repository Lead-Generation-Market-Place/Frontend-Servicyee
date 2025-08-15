import { useState } from 'react';
import Preferences from './preferences';
import NotInterested from './NotInterested';
import PurchaseCredits from './PurchaseCredits';

import { MapPin, Phone, Mail, CheckCircle, ChevronDown, ChevronUp, Clock, User, ShieldCheck, AlertCircle, CreditCard, Settings } from 'lucide-react';
import ContactCustomer from './ContactCustomer';
import Link from 'next/link';

const ProfessionalCard = () => {
    const [expanded, setExpanded] = useState(false);
    const [creditsVisible, setCreditsVisible] = useState(false);
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [IsContactModalOpen, setContactIsModalOpen] = useState(false);
    const [isPurchaseCreditsOpen, setIsPurchaseCreditsOpen] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);
    const toggleCredits = () => setCreditsVisible(!creditsVisible);

    return (
        <div className="">
            {/* Header Section */}
            <div className="p-2 border-b border-gray-100">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center text-white font-bold text-lg">
                                K
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                                <ShieldCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center">
                                <h1 className="text-lg font-medium text-gray-900">Khoa Elexia</h1>

                            </div>

                            <div className="mt-2">
                                <div className="inline-flex items-center bg-[#0077B6]/5 border border-[#0077B6]/10 text-[#0077B6] text-sm font-normal text-[12px] px-6 py-1 rounded-sm">
                                    Home Insulation
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex  font-normal  items-center mt-4 space-x-4">
                    <div className="flex items-center text-gray-700 text-sm">
                        <MapPin className="h-4 w-4 text-[#0077B6] mr-1.5" />
                        <span>Leeds, LS10</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 text-gray-600 mr-1.5" />
                        <span className='text-gray-600'>Posted 19 hours ago</span>
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                        <Phone className="h-5 w-5 text-[#0077B6]" />
                    </div>
                    <div>
                        <span className="text-gray-800 font-medium text-sm block">079**********</span>
                        <div className="flex items-center mt-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-500 mr-1" />
                            <span className="text-green-600 text-xs">Verified phone number</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                        <Mail className="h-5 w-5 text-[#0077B6]" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm">k***7@h*****1.com</span>
                </div>
            </div>

            {/* Progress Section */}
            <div className="p-5 bg-blue-50 border-b border-blue-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[#0077B6] font-semibold text-sm">Response Progress</span>
                    <span className="text-[#0077B6] font-medium text-sm">3/5 professionals</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] h-2 rounded-full transition-all duration-500"
                        style={{ width: '60%' }}
                    ></div>
                </div>
                <p className="mt-2 text-xs">
                    3 professionals have responded to similar requests
                </p>
            </div>

            {/* Action Buttons */}
            <div className="p-5 flex space-x-3">
                <span
                    onClick={() => setContactIsModalOpen(true)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 cursor-pointer hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-red-200/50 flex items-center justify-center text-sm"
                >
                    <AlertCircle className="h-4 w-4 mr-1.5" />
                    Contact
                    {IsContactModalOpen && (
                        <ContactCustomer 
                            onClose={() => setContactIsModalOpen(false)}
                            onBuyCredits={() => {
                                setContactIsModalOpen(false);
                                setIsPurchaseCreditsOpen(true);
                            }}
                        />
                    )}
                </span>
                <span
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-center text-sm"
                >
                    Not interested

                    {IsModalOpen && (
                        <NotInterested onClose={() => setIsModalOpen(false)} />
                    )}
                </span>
            </div>
            {/* PurchaseCredits Modal */}
            {isPurchaseCreditsOpen && (
                <PurchaseCredits
                    pricePerCredit={1.4}
                    credits={100}
                    creditsUsed={0}
                    onClose={() => setIsPurchaseCreditsOpen(false)}
                />
            )}

            {/* Expandable Credits Section */}
            <div
                className={`${creditsVisible ? 'bg-blue-50' : 'bg-white'} border-t border-gray-100 cursor-pointer transition-colors duration-200`}
                onClick={toggleCredits}
            >
                <div className="p-5 flex justify-between items-center">
                    <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-[#0077B6] mr-3" />
                        <div>
                            <div className="flex items-center">
                                <span className="text-lg font-bold text-[#0077B6]">11</span>
                                <span className="ml-1 text-gray-700 font-medium text-sm">credits</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                                Covered by our Get Hired Guarantee
                            </p>
                        </div>
                    </div>
                    {creditsVisible ? (
                        <ChevronUp className="h-5 w-5 text-[#0077B6] transition-transform duration-200" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-[#0077B6] transition-transform duration-200" />
                    )}
                </div>

                {creditsVisible && (
                    <div className="px-5 pb-5 animate-fadeIn">
                        <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-xs">
                            <h3 className="font-semibold text-[#0077B6] text-sm mb-2">Guarantee Details</h3>
                            <p className="text-gray-600 text-xs">
                                If you are not hired during the starter pack, we will return all your credits.
                                This guarantee ensures you get value from our platform.
                            </p>
                            <div className="mt-3 flex items-center text-green-600 text-xs">
                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                <span>Active until: September 30, 2025</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Highlights Section */}
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">Highlights</h3>
                    <button
                        onClick={toggleExpanded}
                        className="text-[#0077B6] text-xs font-medium flex items-center"
                    >
                        {expanded ? 'Show less' : 'Show more'}
                        {expanded ? (
                            <ChevronUp className="h-4 w-4 ml-1 transition-transform duration-200" />
                        ) : (
                            <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200" />
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 flex items-center border border-blue-100">
                        <div className="bg-[#0077B6] p-2 rounded-lg mr-2">
                            <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">Urgent</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 flex items-center border border-blue-100">
                        <div className="bg-[#0077B6] p-2 rounded-lg mr-2">
                            <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">Verified</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 flex items-center border border-blue-100">
                        <div className="bg-[#0077B6] p-2 rounded-lg mr-2">
                            <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">Frequent user</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 flex items-center border border-blue-100">
                        <div className="bg-[#0077B6] p-2 rounded-lg mr-2">
                            <Clock className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">Quick response</span>
                    </div>
                </div>

                {expanded && (
                    <div className="mt-4 animate-fadeIn">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-medium text-gray-700 text-sm mb-2">Additional Details</h4>
                            <ul className="text-gray-600 text-xs space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Average response time: under 2 hours</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>96% customer satisfaction rate</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Specializes in eco-friendly insulation solutions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <Preferences></Preferences>
            <div className="max-w-md p-4">
                <p className="font-semibold text-gray-800">Not seeing the right leads?</p>
                <p className="text-sm text-gray-600">
                    Stop seeing leads with specific answers by customising your settings.
                </p>
                <Link href="/home-services/dashboard/leads/leadSetting" className="flex items-center text-[#0077B6]] hover:underline mt-2 text-sm">
                    <Settings className="w-4 h-4 mr-1 text-[#0077B6] " />
                    Update lead settings
                </Link>
            </div>
        </div>
    );
};

export default ProfessionalCard;