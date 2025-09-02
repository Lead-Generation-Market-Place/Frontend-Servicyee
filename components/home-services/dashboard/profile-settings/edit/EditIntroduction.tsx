import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

const EditIntroduction = () => {
  const [introduction, setIntroduction] = useState("");
  const handleSave = () => {
    alert(`This is the: ${introduction}`);
  };
  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-2 p-2 md:p-4">
          <h1 className="font-bold text-xl mb-4 md:mb-6">
            Edit Basic Information
          </h1>
          <p className="font-semibold">Why should customers hire you?</p>
          <Textarea
            className="h-40"
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Explain what makes your business stand out and why you’ll do a great job."
          />
          <div className="flex md:justify-end lg:justify-end xl:justify-end items-center gap-2 my-5 justify-center">
            <Button
              onClick={handleSave}
              type="button"
              className="bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-500"
            >
              Save
            </Button>
            <Button
              type="button"
              className="bg-transparent text-sky-500 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent border border-gray-200 dark:border-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="flex-1 rounded bg-gray-100 dark:bg-gray-700 h-fit py-4 border border-gray-200 dark:border-gray-800 p-4 mt-4 lg:mt-0">
          <div>
            <div className="flex-1">
              <div className="flex flex-row gap-2 items-center">
                <Lightbulb className="w-4 h-4" />
                <p className="font-bold text-xs">Tips</p>
              </div>
            </div>
            <div className="text-xs pl-6 mt-2">
              <p className="text-xs">
                This is one of the first things customers see about your
                business. Make sure to impress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditIntroduction;
