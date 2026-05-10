"use client";

import { X, Upload } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  value: File | string | null;
  onChange: (file: File | null) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const previewUrl = value instanceof File 
    ? URL.createObjectURL(value) 
    : (typeof value === "string" ? value : null);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
          ${previewUrl ? 'border-[#1677ff] bg-blue-50/30' : 'border-gray-200 hover:border-[#1677ff] hover:bg-gray-50'}
          min-h-[160px] flex flex-col items-center justify-center group`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
        />

        {previewUrl ? (
          <div className="relative w-full aspect-video md:aspect-square lg:aspect-video flex items-center justify-center">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-[160px] w-full object-contain p-2"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                Change Image
              </div>
            </div>
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20 shadow-md transform hover:scale-110 active:scale-95"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="bg-gray-50 p-4 rounded-full inline-block mb-3 text-gray-400 group-hover:text-[#1677ff] group-hover:bg-blue-50 transition-colors">
              <Upload size={28} />
            </div>
            <p className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Click to upload image</p>
            <p className="text-xs text-gray-400 mt-1.5">PNG, JPG or JPEG (Max. 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
