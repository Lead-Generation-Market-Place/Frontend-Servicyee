"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import AddMyLicence from "./AddMyLicence";
import AddCompanyLicence from "./AddCompanyLicence";

const AddLicence = () => {
  const [licence, setLicence] = useState<number | null>(null);

  return (
    <div className="max-w-2xl w-full mx-auto my-5">
      {/* Step 1 - Choose License Holder */}
      {licence === null && (
        <div className="space-y-6">
          <div>
            <h1 className="font-bold text-xl">Add a professional license</h1>
            <p className="text-sm text-gray-500 mt-2">
              Display your professional license to build trust with customers.
            </p>
          </div>

          <div>
            <h1 className="font-bold">Who is the license holder?</h1>
          </div>

          <div className="flex flex-row items-center gap-4 justify-center">
            {/* Myself or Business */}
            <div className="border border-gray-200 dark:border-gray-700 rounded flex flex-col items-center justify-center">
              <Image
                src={"/assets/home-service/individual.svg"}
                width={100}
                height={100}
                alt="individual"
                className="w-50 h-35"
              />
              <div className="p-4 mt-2">
                <p className="text-sm text-gray-500 mb-2">
                  The license is held directly by the Servicyee account holder
                  [professional_Name] or by your business name on Servicyee,
                  [Professional_company_name].
                </p>
                <Button
                  type="button"
                  onClick={() => setLicence(1)}
                  className="bg-sky-500 text-white dark:bg-sky-400 hover:bg-sky-500 dark:hover:bg-sky-400 px-4"
                >
                  Myself or business
                </Button>
              </div>
            </div>

            {/* Employee or Other */}
            <div className="border border-gray-200 dark:border-gray-700 rounded flex flex-col items-center justify-center">
              <Image
                src={"/assets/home-service/company.svg"}
                width={100}
                height={100}
                alt="company"
                className="w-50 h-35"
              />
              <div className="p-4 mt-2">
                <p className="text-sm text-gray-500 mb-2">
                  The license belongs to someone other than [professional_name]
                  or [company_name] (for example, another employee or business
                  entity).
                </p>
                <Button
                  type="button"
                  onClick={() => setLicence(2)}
                  className="bg-sky-500 text-white dark:bg-sky-400 hover:bg-sky-500 dark:hover:bg-sky-400 px-4"
                >
                  Employee or other
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Show Form Based on Choice */}
      {licence === 1 && <AddMyLicence />}
      {licence === 2 && <AddCompanyLicence />}
    </div>
  );
};

export default AddLicence;
