import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";

import { useState } from "react";

const AddCompanyLicence = () => {
  const [helpType, setHelpType] = useState("");
  const [redirect, setRedirect] = useState("");

  const handleNext = () => {
    setRedirect(helpType);
  };
  return (
    <div className="">
      {redirect === "" && (
        <>
          <div className="">
            <h1 className="font-bold text-xl">
              Account information and licensing
            </h1>
            <p className="text-sm">
              To update your account, we&apos;ll need some information and
              documentation from you.
            </p>
          </div>
          <div className="my-5">
            <p className="font-bold">I need help on:</p>
            <div className="mt-5">
              <div>
                <div className="flex items-center space-x-3">
                  <RadioGroup
                    value={helpType}
                    onValueChange={setHelpType}
                    className=""
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="background-check"
                          id="background-check"
                          className="h-6 w-6 border-2 border-gray-400 
                      data-[state=checked]:border-sky-500 
                      data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label
                            htmlFor="background-check"
                            className="text-base"
                          >
                            Background Check
                          </Label>
                          <p className="text-sm text-gray-500">
                            For SSN-Less Background Check
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="account-info"
                          id="account-info"
                          className="h-6 w-6 border-2 border-gray-400 
                      data-[state=checked]:border-sky-500 
                      data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label htmlFor="account-info" className="text-base">
                            Account information update
                          </Label>
                          <p className="text-sm text-gray-500">
                            For email and account information/ownership changes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="license"
                          id="license"
                          className="h-6 w-6 border-2 border-gray-400 
                      data-[state=checked]:border-sky-500 
                      data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label htmlFor="license" className="text-base">
                            License
                          </Label>
                          <p className="text-sm text-gray-500">
                            For issues with license verification
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="business-name-change"
                          id="business-name-change"
                          className="h-6 w-6 border-2 border-gray-400 
                      data-[state=checked]:border-sky-500 
                      data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label
                            htmlFor="business-name-change"
                            className="text-base"
                          >
                            Business name change
                          </Label>
                          <p className="text-sm text-gray-500">
                            For issues updating business information
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="account-removed"
                          id="account-removed"
                          className="h-6 w-6 border-2 border-gray-400 
                      data-[state=checked]:border-sky-500 
                      data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label
                            htmlFor="account-removed"
                            className="text-base"
                          >
                            Account that was removed because I&apos;m believed
                            to be under 18
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="someone-accessing"
                          id="someone-accessing"
                          className="h-6 w-6 border-2 border-gray-400 
                        data-[state=checked]:border-sky-500 
                        data-[state=checked]:bg-sky-500"
                        />
                        <div>
                          <Label
                            htmlFor="someone-accessing"
                            className="text-base"
                          >
                            Someone is accessing my account that shouldn&apos;t
                            be
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="my-5 flex flex-row gap-2 justify-start items-center">
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="bg-sky-500 dark:bg-sky-400 text-white dark:hover:bg-sky-600 hover:bg-sky-600"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {redirect === "background-check" && (
        <div className="">
          <h1 className="text-2xl font-bold">Background Check</h1>
          <p className="text-sm">
            Upload a clear photo of your current government-issued photo ID.
            This keeps your account secure.
          </p>
          <div className="my-5">
            <p className="text-xs">
              Make sure the entire ID is captured within the picture and avoid
              cutting the edges. Make sure to upload the documents using the
              following formats: JPEG, HEIC, PDF. These files will automatically
              be deleted from Thumbtack&apos;s system in 30 days.
            </p>
            <div className="my-4">
              <label
                htmlFor="upload-file"
                className="w-fit mt-4 rounded-sm bg-sky-500 dark:bg-sky-600 px-8 py-2 flex flex-row gap-2 items-center text-white"
              >
                <Paperclip className="w-4 h-4" />
                <p>Attach</p>
              </label>
              <input type="file" name="license" id="upload-file" hidden />
            </div>
            <label htmlFor="note" className="font-semibold textt-sm">
              Is there anything else we should know?
            </label>
            <Textarea
              className="h-32"
              name="note"
              id="note"
              placeholder="Type here..."
            />
            <div className="flex flex-row gap-2 my-5">
              <Button
                onClick={() => setRedirect("")}
                type="button"
                className="bg-transparent dark:bg-transparent text-gray-500 dark:hover:bg-transparent hover:bg-transparent border border-gray-200 dark:border-gray-700 px-4"
              >
                Back
              </Button>
              <Button
                onClick={() => alert("Next button clicked")}
                type="button"
                className="bg-sky-500 dark:bg-sky-400 text-white dark:hover:bg-sky-600 hover:bg-sky-600"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      {redirect === "account-info" && (
        <div className="">Account Information update</div>
      )}
      {redirect === "license" && (
        <div className="">
          <div className="mb-6">
            <h1 className="text-xl font-bold">License</h1>
            <p className="font-semibold text-xs mt-4">
              Use this section if you need help with the following:
            </p>
          </div>
          <RadioGroup>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="someone-accessing"
                id="someone-accessing"
                className="h-6 w-6 border-2 border-gray-400 
                        data-[state=checked]:border-sky-500 
                        data-[state=checked]:bg-sky-500"
              />
              <div>
                <Label htmlFor="someone-accessing" className="text-sm">
                  My license is not verified
                </Label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="someone-accessing"
                id="someone-accessing"
                className="h-6 w-6 border-2 border-gray-400 
                        data-[state=checked]:border-sky-500 
                        data-[state=checked]:bg-sky-500"
              />
              <div>
                <Label htmlFor="someone-accessing" className="text-sm">
                  Someone authorized me to use their license for my business
                </Label>
              </div>
            </div>
          </RadioGroup>
          <div className="my-5 flex flex-row gap-2">
            <Button
              onClick={() => setRedirect("")}
              type="button"
              className="bg-transparent dark:bg-transparent text-gray-500 dark:hover:bg-transparent hover:bg-transparent border border-gray-200 dark:border-gray-700 px-4"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              type="button"
              className="bg-sky-500 dark:bg-sky-400 text-white dark:hover:bg-sky-600 hover:bg-sky-600"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {redirect === "business-name-change" && (
        <div className="">Business name change</div>
      )}
      {redirect === "account-removed" && (
        <div className="">
          Account that was removed because I&apos;m believed to be under 18
        </div>
      )}
      {redirect === "someone-accessing" && (
        <div className="">
          Someone is accessing my account that shouldn&apos;t be
        </div>
      )}
    </div>
  );
};
export default AddCompanyLicence;
