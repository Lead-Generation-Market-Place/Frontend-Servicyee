import { useState } from "react";
import ActiveToggle from "@/components/ui/admin/ActiveToggle";
import ImageUploadSection from "@/components/ui/admin/ImageUploadSection";

const SubcategoryTab = () => {
  const [isActive, setIsActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageSelect = (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Add New Subcategory
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Category
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
            <option value="">Select a category</option>
            <option value="1">Electronics</option>
            <option value="2">Clothing</option>
            <option value="3">Home & Garden</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Enter subcategory name"
          />
        </div>

        <ImageUploadSection
          onImageSelect={handleImageSelect}
          previewUrl={previewUrl}
          label="Subcategory Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            rows={3}
            placeholder="Enter subcategory description"
          />
        </div>

        <ActiveToggle
          isActive={isActive}
          onChange={setIsActive}
          label="Subcategory is active and visible to customers"
          id="subcategoryIsActive"
        />

        <div className="flex justify-end">
          <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium">
            Add Subcategory
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryTab;
