import { Button } from "@/components/ui/button";
import { Globe, LocateIcon, Phone, Timer, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PersonalDetails = () => {
  const professional = {
    company: "Clean Globe",
    profileImage: "/service_profile.jpg",
    rating: 4.5,
    phone: "087453847",
    website: "https://cleanglobe.com",
    address: "SB, Manasas VA 20110",
    yearFounded: 2020,
    num_employees: 12,
    introduction:
      "Add a background check badge to your profile by authorizing a free background check. This will help you build customer trust and get hired more.",
  };
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-5">
      <div className="rounded-lg bg-white dark:bg-gray-800 p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex flex-row justify-start gap-4 items-center">
            <div className="w-24 h-24 xs:w-30 xs:h-30 flex-shrink-0">
              <Image
                src={professional.profileImage}
                width={100}
                height={100}
                alt="profile image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">{professional.company}</p>
              <p>
                {professional.rating}{" "}
                <strong className="text-sky-500">Ask for review</strong>
              </p>
            </div>
          </div>
          <div className="self-center sm:self-auto">
            <Link href="" className="text-sky-500 font-semibold">
              Edit
            </Link>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 my-5">
          <Button
            type="button"
            className="w-full sm:w-auto border border-gray-500 text-sky-500 hover:border-sky-500 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900"
          >
            See how you rank
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto border border-gray-500 text-sky-500 hover:border-sky-500 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900"
          >
            View your profile as customer
          </Button>
        </div>

        {/* Details Section */}
        <div className="space-y-4 mt-6">
          <div className="flex flex-col xs:flex-row xs:items-center gap-2">
            <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
              <Phone className="w-4 h-4" />
              <p className="">Phone</p>
            </div>
            <p className="xs:ml-5 break-all">{professional.phone}</p>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center gap-2">
            <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
              <Globe className="w-4 h-4" />
              <p className="">Website</p>
            </div>
            <p className="xs:ml-5 break-all">{professional.website}</p>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center gap-2">
            <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
              <LocateIcon className="w-4 h-4" />
              <p className="">Address</p>
            </div>
            <p className="xs:ml-5">{professional.address}</p>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center gap-2">
            <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
              <Timer className="w-4 h-4" />
              <p className="">Year Founded</p>
            </div>
            <p className="xs:ml-5">{professional.yearFounded}</p>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center gap-2">
            <div className="flex flex-row gap-2 font-bold items-center min-w-[120px]">
              <Users className="w-4 h-4" />
              <p className="">Number of Employees</p>
            </div>
            <p className="xs:ml-5">{professional.num_employees}</p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
          <p className="font-bold">Introduction</p>
          <Link href={"#"} className="text-sky-500 font-semibold">
            Edit
          </Link>
        </div>
        <p className="mt-3">{professional.introduction}</p>
      </div>
    </div>
  );
};
export default PersonalDetails;
