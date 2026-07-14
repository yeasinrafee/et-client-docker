import { z } from "zod";

/**
 * Shared SEO sub-schema.
 * Merge into any module schema under the `seo` key:
 *
 *   const productSchema = z.object({
 *     title: z.string().min(1),
 *     ...
 *     seo: seoSchema.optional(),
 *   });
 */
export const seoSchema = z.object({
  /** Shown in <title> / og:title — keep ≤ 70 chars for Google */
  metaTitle: z
    .string()
    .max(70, "Meta title should be 70 characters or fewer")
    .optional()
    .default(""),

  /** Shown in meta description — ideal range 150–160 chars */
  metaDescription: z
    .string()
    .max(160, "Meta description should be 160 characters or fewer")
    .optional()
    .default(""),

  /** Comma-separated keywords — stored as string, split server-side */
  seoKeywords: z.string().optional().default(""),
});

export type SeoData = z.infer<typeof seoSchema>;

export const emptySeoData: SeoData = {
  metaTitle: "",
  metaDescription: "",
  seoKeywords: "",
};
