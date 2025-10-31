import { useState } from "react";
import ActiveToggle from "@/components/ui/admin/ActiveToggle";
import ImageUploadSection from "@/components/ui/admin/ImageUploadSection";

const ServiceTab = () => {
  const [isActive, setIsActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageSelect = (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Add New Service</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
              <option value="">Select category</option>
              <option value="1">Electronics</option>
              <option value="2">Clothing</option>
              <option value="3">Home & Garden</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
              <option value="">Select subcategory</option>
              <option value="1">Smartphones</option>
              <option value="2">Laptops</option>
              <option value="3">Tablets</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Enter service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            rows={3}
            placeholder="Enter service description"
          />
        </div>

        <PriceInput />

        <ImageUploadSection
          onImageSelect={handleImageSelect}
          previewUrl={previewUrl}
          label="Service Image"
        />

        <ActiveToggle
          isActive={isActive}
          onChange={setIsActive}
          label="Service is active and available to customers"
          id="serviceIsActive"
        />

        <div className="flex justify-end space-x-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Cancel
          </button>
          <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium">
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
};

const PriceInput = () => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Price
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500">$</span>
      </div>
      <input
        type="number"
        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        placeholder="0.00"
        step="0.01"
        min="0"
      />
    </div>
  </div>
);

export default ServiceTab;
