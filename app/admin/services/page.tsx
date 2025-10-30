"use client";

import { PostCategory } from "@/app/api/homepage/postServices";
import { CircleCheck, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ✅ Type definition
interface CategoryType {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  category_image_file: File | null; // actual file
  category_image_url: string; // preview URL
}

const ManageServices = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [categoryFormData, setCategoryFormData] = useState<CategoryType>({
    name: "",
    slug: "",
    description: "",
    is_active: true,
    category_image_file: null,
    category_image_url: "",
  });

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^-+|-+$/g, "");

  // Auto-update slug when name changes
  useEffect(() => {
    setCategoryFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
  }, [categoryFormData.name]);

  const handlePostCategory = async () => {
    if (!categoryFormData.category_image_file) {
      setError("Category image is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      // ✅ Create FormData
      const formData = new FormData();
      formData.append("name", categoryFormData.name);
      formData.append("slug", categoryFormData.slug);
      formData.append("description", categoryFormData.description);
      formData.append("is_active", String(categoryFormData.is_active));
      formData.append(
        "category_image_url",
        categoryFormData.category_image_file
      );

      // ✅ Pass FormData directly
      const response = await PostCategory(formData);

      setSuccess("Category created successfully!");
      setCategoryFormData({
        name: "",
        slug: "",
        description: "",
        is_active: true,
        category_image_file: null,
        category_image_url: "",
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create category"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const [activeTab, setActiveTab] = useState<
    "category" | "subcategory" | "service"
  >("category");

  const tabs = [
    { id: "category", label: "Add Category" },
    { id: "subcategory", label: "Add Subcategory" },
    { id: "service", label: "Add Service" },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Manage Services
        </h1>
        <p className="text-gray-600">
          Add and manage categories, subcategories, and services
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex flex-row gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "text-sky-600 border-sky-600"
                  : "text-gray-500 border-transparent hover:text-sky-500 hover:border-sky-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === "category" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Category
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setCategoryFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={categoryFormData.slug}
                  disabled
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="will be auto generated"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  rows={3}
                  onChange={(e) =>
                    setCategoryFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()} // 👈 trigger file input
                >
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>

                  {/* ✅ Hidden input triggered programmatically */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log("Selected file:", file);
                        setCategoryFormData((prev) => ({
                          ...prev,
                          category_image_file: file, // store actual file
                          category_image_url: URL.createObjectURL(file),
                        }));
                      }
                    }}
                  />
                </div>

                {/* ✅ Optional Preview */}
                {categoryFormData.category_image_url && (
                  <img
                    src={categoryFormData.category_image_url}
                    alt="Preview"
                    className="w-24 h-16 object-cover rounded-lg mt-3 mx-auto"
                  />
                )}
              </div>
              <div className="flex flex-row justify-center items-center gap-2 text-sm">
                {error && (
                  <>
                    <Info className="text-red-500" size={18} />
                    <p className="text-red-500">{error}</p>
                  </>
                )}

                {success && (
                  <>
                    <CircleCheck className="text-green-500" size={18} />
                    <p className="text-green-500">{success}</p>
                  </>
                )}
              </div>

              {/* Category Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="categoryIsActive"
                  checked={categoryFormData.is_active}
                  onChange={(e) =>
                    setCategoryFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked, // ✅ updates the boolean
                    }))
                  }
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="categoryIsActive"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Category is active and visible to customers
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handlePostCategory}
                  disabled={isSubmitting} // prevent multiple clicks
                  className={`relative inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white rounded transition-colors
                  ${
                    isSubmitting
                      ? "bg-sky-400 cursor-not-allowed"
                      : "bg-sky-600 hover:bg-sky-700"
                  }
                `}
                >
                  {isSubmitting ? (
                    <>
                      {/* Simple spinner */}
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    "Add Category"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subcategory" && (
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>
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

              {/* Subcategory Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subcategoryIsActive"
                  defaultChecked
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="subcategoryIsActive"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Subcategory is active and visible to customers
                </label>
              </div>

              <div className="flex justify-end">
                <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium">
                  Add Subcategory
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "service" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Service
            </h2>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>

              {/* Service Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="serviceIsActive"
                  defaultChecked
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="serviceIsActive"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Service is active and available to customers
                </label>
              </div>

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
        )}
      </div>

      {/* Recent Items Section */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Electronics</h4>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              5 subcategories, 25 services
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Smartphones</h4>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Subcategory • 12 services
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">iPhone Repair</h4>
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                Inactive
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Service • $99.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
