import { api } from "../axios";

// ✅ Define the Category type
export interface CategoryType {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  category_image_file?: File | null; 
  category_image_url:string;
}

// ✅ Define the props type for PostCategory
interface CategoryProps {
  categoryData: CategoryType;
}

// ✅ Correct PostCategory function
export const PostCategory = async (formData: FormData) => {
  try {
    const response = await api.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting category:", error);
    throw error;
  }
};

