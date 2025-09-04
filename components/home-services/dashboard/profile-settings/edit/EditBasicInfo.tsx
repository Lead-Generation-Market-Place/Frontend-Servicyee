"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronRight, Lightbulb, Lock, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EditBasicInfo = () => {
  const [businessName, setBusinessName] = useState("Clean Globe");
  const [yearFounded, setYearFounded] = useState("2020");
  const [numEmployees, setNumEmployees] = useState("20");
  const [phoneNumber, setPhoneNumber] = useState("0767556557");
  const [website, setWebsite] = useState("www.cleanglobe.com");
  const [address, setAddress] = useState("Sb");
  const [suitApt, setSuitApt] = useState("");
  const [zipCode, setZipcode] = useState("20323");
  // payment methods
  const [applePay, setApplePay] = useState(false);
  const [cash, setCash] = useState(false);
  const [check, setCheck] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [googlePay, setGooglePay] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [samsungPay, setSamsungPay] = useState(false);
  const [squareCashApp, setSquareCashApp] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [venmo, setVenmo] = useState(false);
  const [zelle, setZelle] = useState(false);
  const handleUpdate = () => {
    console.log(
      applePay,
      cash,
      check,
      creditCard,
      googlePay,
      paypal,
      samsungPay,
      squareCashApp,
      stripe,
      venmo,
      zelle,
      "updated"
    );
  };
  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-2 p-2 md:p-4">
          <h1 className="font-bold text-xl mb-4 md:mb-6">
            Edit Basic Information
          </h1>
          <div className="mt-4 md:mt-5">
            <p className="text-sm font-semibold">Profile Photo</p>
            <div className="relative w-fit mt-2">
              <Image
                src={
                  "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg"
                }
                width={100}
                height={100}
                alt="profile image"
                className="w-24 h-24 md:w-30 md:h-30 rounded-lg object-cover"
              />
              <span className="p-1 md:p-2 rounded-lg bg-white text-gray-950 absolute top-0 md:top-1 right-0 md:right-1 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white cursor-pointer">
                <label htmlFor="upload-profile" className="cursor-pointer">
                  <Pencil className="w-3 h-3 md:w-4 md:h-4" />
                </label>
                <input
                  type="file"
                  id="upload-profile"
                  name="upload-profile"
                  hidden
                />
              </span>
            </div>
            {/* Business Name */}
            <div className="mt-4">
              <label
                htmlFor="business-name"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
              >
                Business Name
              </label>
              <Input
                type="text"
                onChange={(e) => setBusinessName(e.target.value)}
                id="business-name"
                className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={businessName}
                placeholder="Business Name"
              />
              <small className="text-xs text-gray-500">
                Example: Bashery&apos;s Painting services
              </small>
            </div>
            {/* year founded and number of employees */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center mt-4">
              <div className="w-full">
                <label
                  htmlFor="year-founded"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                >
                  Year Founded
                </label>
                <Input
                  type="text"
                  onChange={(e) => setYearFounded(e.target.value)}
                  id="year-founded"
                  className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={yearFounded}
                  placeholder="e.g 2008"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="num-employees"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                >
                  Number of Employees
                </label>
                <Input
                  type="text"
                  onChange={(e) => setNumEmployees(e.target.value)}
                  id="num-employees"
                  className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={numEmployees}
                  placeholder="Number of Employees"
                />
              </div>
            </div>
            {/* phone number and website */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center mt-4">
              <div className="w-full">
                <label
                  htmlFor="phone-number"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                >
                  Phone Number (optional)
                </label>
                <Input
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id="phone-number"
                  className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={phoneNumber}
                  placeholder="Phone Number"
                />
                <span className="flex flex-row items-center gap-2 mt-1 text-gray-500 text-xs">
                  <Lock className="w-3 h-3" />
                  <p>Hidden until customer contacts you.</p>
                </span>
              </div>
              <div className="w-full">
                <label
                  htmlFor="website"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                >
                  Website (optional)
                </label>
                <Input
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                  id="website"
                  className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={website}
                  placeholder="e.g www.example.com"
                />
                <span className="flex flex-row items-center gap-2 mt-1 text-gray-500 text-xs">
                  <Lock className="w-3 h-3" />
                  <p>Hidden until customer contacts you.</p>
                </span>
              </div>
            </div>

            {/* address */}
            <div className="mt-4">
              <label
                htmlFor="address"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
              >
                Address
              </label>
              <Input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                className="mt-1 outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={address}
                placeholder="Address line 1"
              />
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-2">
                <div className="w-full">
                  <Input
                    type="text"
                    onChange={(e) => setSuitApt(e.target.value)}
                    id="suit-apt"
                    className="outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={suitApt}
                    placeholder="Suit/Apt"
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    onChange={(e) => setZipcode(e.target.value)}
                    id="zipcode"
                    className="outline-none border-none ring-1 ring-gray-300 dark:ring-gray-600 
             focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={zipCode}
                    placeholder="zip code"
                  />
                </div>
              </div>
            </div>

            {/* payment method accepted */}
            <div className="mt-6">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 block">
                Payment method accepted
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="apple-pay"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setApplePay(checked === true)}
                    checked={applePay}
                  />
                  <label
                    htmlFor="apple-pay"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Apple Pay
                  </label>
                </div>
                {/* cash */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="cash"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setCash(checked === true)}
                    checked={cash}
                  />
                  <label
                    htmlFor="cash"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Cash
                  </label>
                </div>
                {/* Check */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Check"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setCheck(checked === true)}
                    checked={check}
                  />
                  <label
                    htmlFor="Check"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Check
                  </label>
                </div>
                {/* Credit Card */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="credit-card"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) =>
                      setCreditCard(checked === true)
                    }
                    checked={creditCard}
                  />
                  <label
                    htmlFor="credit-card"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Credit Card
                  </label>
                </div>
                {/* Google pay */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="google-pay"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) =>
                      setGooglePay(checked === true)
                    }
                    checked={googlePay}
                  />
                  <label
                    htmlFor="google-pay"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Google Pay
                  </label>
                </div>
                {/* Paypal */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="paypal"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setPaypal(checked === true)}
                    checked={paypal}
                  />
                  <label
                    htmlFor="paypal"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Paypal
                  </label>
                </div>
                {/* Samsung pay */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="samsung-pay"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) =>
                      setSamsungPay(checked === true)
                    }
                    checked={samsungPay}
                  />
                  <label
                    htmlFor="samsung-pay"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Samsung Pay
                  </label>
                </div>
                {/* Square cash app */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="square-cash-app"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) =>
                      setSquareCashApp(checked === true)
                    }
                    checked={squareCashApp}
                  />
                  <label
                    htmlFor="square-cash-app"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Square cash app
                  </label>
                </div>
                {/* Stripe */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="stripe"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setStripe(checked === true)}
                    checked={stripe}
                  />
                  <label
                    htmlFor="stripe"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Stripe
                  </label>
                </div>
                {/* venmo */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="venmo"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setVenmo(checked === true)}
                    checked={venmo}
                  />
                  <label
                    htmlFor="venmo"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Venmo
                  </label>
                </div>
                {/* zelle */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="zelle"
                    className="w-5 h-5 border border-gray-200 dark:border-gray-700 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:border-sky-700 dark:data-[state=checked]:bg-sky-700"
                    onCheckedChange={(checked) => setZelle(checked === true)}
                    checked={zelle}
                  />
                  <label
                    htmlFor="zelle"
                    className="text-md text-gray-700 dark:text-gray-300"
                  >
                    Zelle
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-8">
              <Button
                className="text-red-500 bg-transparent hover:bg-transparent border border-gray-500 rounded-md px-4 order-2 sm:order-1"
                type="button"
              >
                <Link href="/home-services/dashboard/profile-settings">
                  Cancel
                </Link>
              </Button>
              <Button
                type="button"
                onClick={handleUpdate}
                className="text-white bg-sky-500 px-4 hover:bg-sky-600 order-1 sm:order-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded bg-gray-100 dark:bg-gray-700 h-fit py-4 border border-gray-200 dark:border-gray-800 p-4 mt-4 lg:mt-0">
          <div>
            <div className="flex-1">
              <div className="flex flex-row gap-2 items-center">
                <Lightbulb className="w-4 h-4" />
                <p className="font-bold text-xs">Example and tips</p>
              </div>
            </div>
            <div className="text-xs pl-6 mt-2">
              <ul className="list-disc">
                <li>Make sure to smile.</li>
                <li>Take photo in daylight. No flash.</li>
                <li>Use a solid background.</li>
                <li>Hold camera slightly higher than eye level.</li>
              </ul>
              <Link
                href="#"
                className="text-sky-500 font-bold flex flex-row gap-1 items-center mt-2"
              >
                <p>See more</p>
                <ChevronRight className="w-3 h-3 font-bold" />
              </Link>
              <div className="flex flex-wrap gap-2 items-center justify-start mt-3">
                <Image
                  src={
                    "https://images.pexels.com/photos/26180891/pexels-photo-26180891.jpeg"
                  }
                  width={80}
                  height={80}
                  alt="image"
                  className="w-20 h-16 object-cover rounded border border-gray-200 dark:border-gray-700"
                />

                <Image
                  src={
                    "https://images.pexels.com/photos/29409175/pexels-photo-29409175.jpeg"
                  }
                  width={80}
                  height={80}
                  alt="image"
                  className="w-20 h-16 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
                <Image
                  src={
                    "https://images.pexels.com/photos/27919272/pexels-photo-27919272.jpeg"
                  }
                  width={80}
                  height={80}
                  alt="image"
                  className="w-20 h-16 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditBasicInfo;
