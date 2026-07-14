"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SeoData } from "@/lib/schemas/seo";

interface SeoFieldsProps {
  /** Current SEO values */
  value: SeoData;
  /** Called whenever any SEO field changes */
  onChange: (updated: SeoData) => void;
  /** Optional prefix for input IDs to avoid conflicts when multiple forms are on the same page */
  idPrefix?: string;
}

/**
 * Reusable SEO Settings card.
 *
 * Usage (useState pattern):
 * ```tsx
 * const [seoData, setSeoData] = useState<SeoData>(emptySeoData);
 * ...
 * <SeoFields value={seoData} onChange={setSeoData} />
 * ```
 *
 * The three field names (metaTitle, metaDescription, seoKeywords) map
 * directly to Next.js generateMetadata:
 * ```ts
 * export async function generateMetadata({ params }) {
 *   const item = await fetchItem(params.slug);
 *   return {
 *     title:       item.seo?.metaTitle       || item.title,
 *     description: item.seo?.metaDescription || item.description,
 *     keywords:    item.seo?.seoKeywords,
 *   };
 * }
 * ```
 */
export default function SeoFields({ value, onChange, idPrefix = "" }: SeoFieldsProps) {
  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name);

  const set = (field: keyof SeoData, val: string) =>
    onChange({ ...value, [field]: val });

  const metaTitleLen = (value.metaTitle ?? "").length;
  const metaDescLen = (value.metaDescription ?? "").length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div>
        <h2 className="font-semibold text-gray-800 text-base">
          SEO Settings{" "}
          <span className="text-gray-400 font-normal text-sm">(optional)</span>
        </h2>
        <hr className="mt-3 border-gray-100" />
      </div>

      {/* Meta Title */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor={id("metaTitle")}>Meta Title</Label>
          <span
            className={`text-xs tabular-nums ${
              metaTitleLen > 70 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {metaTitleLen}/70
          </span>
        </div>
        <Input
          id={id("metaTitle")}
          value={value.metaTitle ?? ""}
          onChange={(e) => set("metaTitle", e.target.value)}
          placeholder="e.g. AI Analytics Dashboard | Emperal Tech"
          maxLength={70}
        />
      </div>

      {/* Meta Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor={id("metaDescription")}>Meta Description</Label>
          <span
            className={`text-xs tabular-nums ${
              metaDescLen > 160 ? "text-red-500" : metaDescLen > 140 ? "text-amber-500" : "text-gray-400"
            }`}
          >
            {metaDescLen}/160
          </span>
        </div>
        <Textarea
          id={id("metaDescription")}
          value={value.metaDescription ?? ""}
          onChange={(e) => set("metaDescription", e.target.value)}
          placeholder="A compelling description for search engines (150–160 chars recommended)"
          rows={3}
          maxLength={160}
        />
      </div>

      {/* SEO Keywords */}
      <div className="space-y-1.5">
        <Label htmlFor={id("seoKeywords")}>
          SEO Keywords{" "}
          <span className="text-gray-400 font-normal text-xs">(comma separated)</span>
        </Label>
        <Input
          id={id("seoKeywords")}
          value={value.seoKeywords ?? ""}
          onChange={(e) => set("seoKeywords", e.target.value)}
          placeholder="e.g. AI analytics, business intelligence, dashboard"
        />
      </div>
    </div>
  );
}
