"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddMyLicence = () => {
  const router = useRouter();
  const [stateName, setStateName] = useState("");
  const [licenceType, setLicenceType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [licenseExpiration, setLicenseExpiration] = useState("");
  const [licensingAgency, setLicensingAgency] = useState("");

  const handleSubmit = () => {
    confirm("Confirm to submit the form");
  };
  return (
    <div className="">
      <div className="space-y-5">
        <h1 className="font-bold text-xl">Add a professional license</h1>
        <p className="text-sm">
          Display your professional license to build trust with customers. We
          will check the information provided against the state&apos;s public
          licensing database.
        </p>
      </div>
      <div className="my-5 border border-gray-200 dark:border-gray-700 rounded-md p-4 space-y-4">
        <div className="">
          <label htmlFor="state" className="font-bold">
            State
          </label>
          <Select value={stateName} onValueChange={(val) => setStateName(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>State</SelectLabel>
                <SelectItem value="ak">Alaska</SelectItem>
                <SelectItem value="al">Alabama</SelectItem>
                <SelectItem value="ar">Argentina</SelectItem>
                <SelectItem value="az">Arezona</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="co">Colambia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <label htmlFor="licence-type" className="font-bold">
            License Type
          </label>
          <Select
            value={licenceType}
            onValueChange={(val) => setLicenceType(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select license type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>License Types</SelectLabel>
                <SelectItem value="Architect">Architect</SelectItem>
                <SelectItem value="attorney-occupational-license">
                  Attorney Occupational License
                </SelectItem>
                <SelectItem value="brokerage-firm-securities">
                  Brokerage Firm (Securities)
                </SelectItem>
                <SelectItem value="boroker-securities">
                  Broker (Securities)
                </SelectItem>
                <SelectItem value="c19b-marble-contractor">
                  C19b – Marble Contractor
                </SelectItem>
                <SelectItem value="car-towing-usdot">
                  Car Towing - USDOT
                </SelectItem>
                <SelectItem value="contractor-duct-air-tightness-testing">
                  Contractor – Duct Air Tightness Testing
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <label htmlFor="license-owner" className="font-bold">
            License owner&apos;s name
          </label>
          <Input
            type="text"
            onChange={(e) => setOwnerName(e.target.value)}
            id="license-owner"
            className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={ownerName}
            placeholder="license owner's name"
          />
        </div>
        <div className="">
          <label htmlFor="license-expiration" className="font-bold">
            License expiration
          </label>
          <Input
            type="date"
            onChange={(e) => setLicenseExpiration(e.target.value)}
            id="license-expiration"
            className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={licenseExpiration}
            placeholder="Date"
          />
          <small>Leave blank if your license has no expiration.</small>
        </div>
        <div className="">
          <label htmlFor="license-agency" className="font-bold">
            Like to licensing agency
          </label>
          <Input
            type="text"
            onChange={(e) => setLicensingAgency(e.target.value)}
            id="license-expiration"
            className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={licensingAgency}
            placeholder="Optional"
          />
          <small>
            Supplying this will help speed up verification and approval.
          </small>
        </div>
        <div className="flex justify-center gap-2 items-center">
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-sky-500 dark:bg-sky-400 text-white dark:hover:bg-sky-500 hover:bg-sky-600 px-4"
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-transparent dark:bg-transparent text-gray-500 dark:hover:bg-transparent hover:bg-transparent px-4 border border-gray-200 dark:border-gray-700"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddMyLicence;
