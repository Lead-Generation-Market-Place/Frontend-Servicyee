"use client";

import { useGetProfessional } from "@/hooks/usegetProfessionalById";
import { Button } from "@/components/ui/button";
import { Globe, LocateIcon, Phone, Timer, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PersonalDetails = () => {
  const { data: prov, isLoading, isError, refetch, error } = useGetProfessional();
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);

  const professionalDetails = prov || {};

  // ------------------------------
  // Loading Skeleton
  // ------------------------------
  if (isLoading || retrying) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-5 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="h-6 bg-gray-300 rounded w-64"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // ------------------------------
  // Error State
  // ------------------------------
  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-red-600 font-semibold mb-2">
          Oops! Something went wrong while fetching your profile.
        </p>
        <p className="text-gray-500 mb-4">
          Please check your internet connection or try again later.
        </p>
        {error?.message && (
          <p className="text-gray-400 text-sm mb-4">Error: {error.message}</p>
        )}
        <Button
          disabled={retrying}
          onClick={async () => {
            setRetrying(true);
            await refetch();
            setRetrying(false);
          }}
          className="bg-sky-500 text-white hover:bg-sky-600"
        >
          {retrying ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }

  // ------------------------------
  // Default professional fallback
  // ------------------------------
  const professional = {
    id: professionalDetails.id || 33,
    phone: professionalDetails.phone || "N/A",
    address: professionalDetails.address || "N/A",
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-5">
      {/* Header Section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex flex-row justify-start gap-4 items-center">
            <div className="w-24 h-24 xs:w-30 xs:h-30 flex-shrink-0">
              <Image
                src={professionalDetails.profile_image || "/default-profile.png"}
                width={100}
                height={100}
                alt="profile image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">
                {professionalDetails.business_name || "No Name"}
              </p>
              <p>
                {professionalDetails.rating_avg || "N/A"}{" "}
                <strong className="text-sky-500">Ask for review</strong>
              </p>
            </div>
          </div>
          <div className="self-center sm:self-auto">
            <Link
              href={`/home-services/dashboard/profile-settings/edit-basic-info`}
              className="text-sky-500 font-semibold"
            >
              Edit
            </Link>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 my-5">
          <Button className="w-full sm:w-auto border border-gray-500 text-sky-500 hover:border-sky-500 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900">
            See how you rank
          </Button>
          <Button
            onClick={() =>
              router.push(`/home-services/professional-profile/${professional.id}`)
            }
            className="w-full sm:w-auto border border-gray-500 text-sky-500 hover:border-sky-500 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900"
          >
            View your profile as customer
          </Button>
        </div>

        {/* Details */}
        <div className="space-y-4 mt-6">
          {[
            { icon: Phone, label: "Phone", value: professional.phone },
            { icon: Globe, label: "Website", value: professionalDetails.website || "N/A" },
            { icon: LocateIcon, label: "Address", value: professional.address || "N/A" },
            { icon: Timer, label: "Year Founded", value: professionalDetails.founded_year || "N/A" },
            { icon: Users, label: "Number of Employees", value: professionalDetails.employees || "N/A" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col xs:flex-row xs:items-center gap-2"
            >
              <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
                <item.icon className="w-4 h-4" />
                <p>{item.label}</p>
              </div>
              <p className="xs:ml-5 break-all">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction Section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
          <p className="font-bold">Introduction</p>
          <Link
            href={`/home-services/dashboard/profile-settings/edit-intro`}
            className="text-sky-500 font-semibold"
          >
            Edit
          </Link>
        </div>
        <p className="mt-3">{professionalDetails.introduction || "No introduction provided."}</p>
      </div>
    </div>
  );
};

export default PersonalDetails;
