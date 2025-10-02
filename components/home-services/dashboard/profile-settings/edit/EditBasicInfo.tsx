"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLocationByUserId } from "@/hooks/useLocation";
import { useGetProfessionalbyUserId, useUpdateProfessional } from "@/hooks/useProfessional";
import { Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PaymentMethod = "Cash" | "Apple Pay" | "Paypal" | "Stripe" | "Zelle";
const paymentOptions: PaymentMethod[] = ["Cash", "Apple Pay", "Paypal", "Stripe", "Zelle"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// Type guard for payment methods
const isValidPaymentMethod = (method: unknown): method is PaymentMethod => {
  return typeof method === 'string' && paymentOptions.includes(method as PaymentMethod);
};

const formSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  founded_year: z.string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 1900 && Number(val) <= new Date().getFullYear()), {
      message: "Year must be a valid number between 1900 and current year",
    })
    .optional(),
  employees: z.string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Employees must be a valid non-negative number",
    })
    .optional(),
  website: z.string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Please enter a valid URL",
    })
    .optional(),
  address_line: z.string().min(1, "Address is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  payment_methods: z.array(z.enum(["Cash", "Apple Pay", "Paypal", "Stripe", "Zelle"]))
    .min(1, "At least one payment method is required"),
  profile_image: z.instanceof(FileList)
    .refine((files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE, {
      message: "Max file size is 10MB.",
    })
    .refine((files) => files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
      message: "Only .jpg, .jpeg, and .png files are accepted.",
    })
    .optional()
    .nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const EditBasicInfo = () => {
  const router = useRouter();
  const { data: pro, isLoading, isError, refetch } = useGetProfessionalbyUserId();
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    refetch: refetchLocation,
  } = useLocationByUserId();

  const { mutate: updatePro, isPending } = useUpdateProfessional();
  const [retrying, setRetrying] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formDataLoaded, setFormDataLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      founded_year: "",
      employees: "",
      website: "",
      address_line: "",
      zipcode: "",
      payment_methods: [],
      profile_image: undefined,
    },
  });

  // Reset form when professional or location data changes
  useEffect(() => {
    if ((pro || location) && !formDataLoaded) {
      const paymentMethods = pro?.payment_methods || [];
      
      const validPaymentMethods = paymentMethods.filter(isValidPaymentMethod);

      reset({
        business_name: pro?.business_name || "",
        founded_year: pro?.founded_year?.toString() || "",
        employees: pro?.employees?.toString() || "",
        website: pro?.website || "",
        address_line: location?.address_line || "",
        zipcode: location?.zipcode || "",
        payment_methods: validPaymentMethods,
        profile_image: undefined,
      });
      setPreviewImage(pro?.profile_image || null);
      setFormDataLoaded(true);
    }
  }, [pro, location, reset, formDataLoaded]);

  // Watch profile image input to update preview
  const watchedImage = watch("profile_image");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0 && watchedImage[0] instanceof File) {
      const file = watchedImage[0];
      
      // Validate file before creating preview
      if (file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  }, [watchedImage]);

  const onSubmit = async (values: FormValues) => {
    if (!pro?._id) return;

    try {
      const formData = new FormData();
      formData.append("business_name", values.business_name || "");
      
      // Convert string values back to numbers for API if they exist
      if (values.founded_year && values.founded_year.trim() !== "") {
        formData.append("founded_year", values.founded_year);
      }
      
      if (values.employees && values.employees.trim() !== "") {
        formData.append("employees", values.employees);
      }
      
      formData.append("website", values.website || "");
      formData.append("address_line", values.address_line || "");
      formData.append("zipcode", values.zipcode || "");
      formData.append("payment_methods", JSON.stringify(values.payment_methods || []));

      // Only append profile_image if a new file is selected
      if (values.profile_image && values.profile_image.length > 0 && values.profile_image[0] instanceof File) {
        formData.append("profile_image", values.profile_image[0]);
      }

      updatePro(
        { id: pro._id, data: formData },
        {
          onSuccess: () => {
            refetch();
            refetchLocation();
            router.back(); 
          },
        }
      );
    } catch {
      // Error handling would be done by the mutation's onError callback
    }
  };

  if (isLoading || isLoadingLocation || retrying) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-5 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="h-6 bg-gray-300 rounded w-64"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (isError || isErrorLocation) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-red-600 font-semibold mb-2">
          Oops! Something went wrong while fetching your profile or location.
        </p>
        <p className="text-gray-500 mb-4">
          Please check your internet connection or try again later.
        </p>
        <Button
          disabled={retrying}
          onClick={async () => {
            setRetrying(true);
            await refetch();
            await refetchLocation();
            setRetrying(false);
          }}
          className="bg-sky-500 text-white hover:bg-sky-600"
        >
          {retrying ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-xl mb-4 md:mb-6">Edit Basic Information</h1>

        {/* Profile Photo */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Profile Photo</p>
          <div className="relative w-fit mt-2">
            {previewImage ? (
              <Image
                src={previewImage}
                width={100}
                height={100}
                alt="profile image"
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            )}
            <span className="p-1 rounded-lg bg-white absolute top-0 right-0 border cursor-pointer">
              <label htmlFor="upload-profile" className="cursor-pointer">
                <Pencil className="w-4 h-4" />
              </label>
              <input
                type="file"
                id="upload-profile"
                accept="image/png, image/jpeg, image/jpg"
                {...register("profile_image")}
                className="hidden"
              />
            </span>
          </div>
          {errors.profile_image && (
            <p className="text-red-600 text-sm mt-1">{errors.profile_image.message as string}</p>
          )}
        </div>

        {/* Other Inputs */}
        {[
          { label: "Business Name", name: "business_name", type: "text", required: true },
          { label: "Year Founded", name: "founded_year", type: "text", required: false, placeholder: "e.g., 2022" },
          { label: "Number of Employees", name: "employees", type: "text", required: false, placeholder: "e.g., 10" },
          { label: "Website", name: "website", type: "text", required: false, placeholder: "e.g., https://example.com" },
          { label: "Address", name: "address_line", type: "text", required: true },
          { label: "Zip Code", name: "zipcode", type: "text", required: true },
        ].map((field) => (
          <div key={field.name} className="mt-4">
            <label className="text-sm font-semibold">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name as keyof FormValues)}
            />
            {errors[field.name as keyof FormValues] && (
              <p className="text-red-600 text-sm mt-1">
                {errors[field.name as keyof FormValues]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Payment Methods */}
        <div className="mt-6">
          <p className="text-lg font-semibold">Payment Methods Accepted</p>
          <p className="text-sm text-gray-600 mb-3">
            Current selection: {pro?.payment_methods?.join(", ") || "None selected"}
          </p>
          <Controller
            control={control}
            name="payment_methods"
            render={({ field }) => (
              <div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {paymentOptions.map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer select-none">
                      <Checkbox
                        checked={field.value.includes(method)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, method]);
                          } else {
                            field.onChange(field.value.filter((v: PaymentMethod) => v !== method));
                          }
                        }}
                      />
                      {method}
                    </label>
                  ))}
                </div>
                {errors.payment_methods && (
                  <p className="text-red-600 text-sm mt-2 font-medium">{errors.payment_methods.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="bg-sky-500 text-white flex items-center gap-2 hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBasicInfo;