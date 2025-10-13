// Service Type
export type ServiceType = {
  _id: string;
  name: string;
  slug: string;
  subcategory_id: string; // Changed to string to match your API response
  is_active: boolean;
  image_url: string;
  description: string;
}

// Subcategory Type (basic)
export type SubcategoryType = {
  _id: string;
  name: string;
  slug: string;
  subcategory_image_url: string;
  category_id?: string; // Optional if you have category reference
  is_active?: boolean; // Optional if you have active status
  description?: string; // Optional if you have description
}

// Subcategory with Services Type
export type SubcategoryWithServicesType = {
  _id: string;
  name: string;
  slug: string;
  subcategory_image_url: string;
  services: ServiceType[];
  services_count: number;
}