import z from 'zod'

export const professionalSchema = z.object({
  introduction: z
    .string()
    .min(100, "Introduction must be at least 100 characters")
    .max(500, "Introduction must be less than 500 characters"),
});

export type ProfessionalFormData = z.infer<typeof professionalSchema>