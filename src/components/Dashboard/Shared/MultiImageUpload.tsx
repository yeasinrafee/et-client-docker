"use client";

import { X, Upload, Plus } from "lucide-react";
import { useRef } from "react";

interface MultiImageUploadProps {
  value: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  label?: string;
}

export default function MultiImageUpload({ 
  value = [], 
  onChange, 
  label = "Upload Images" 
}: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length > 0) {
      onChange([...value, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const getPreviewUrl = (item: File | string) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    return item;
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((item, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 flex items-center justify-center"
          >
            <img 
              src={getPreviewUrl(item)} 
              alt={`Preview ${index}`} 
              className="h-full w-full object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove(index);
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100 shadow-sm"
            >
              <X size={14} />
            </button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] py-1 text-center font-medium">
                Feature Image
              </div>
            )}
          </div>
        ))}
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1677ff] hover:bg-blue-50/30 transition-all group"
        >
          <div className="bg-gray-100 p-2 rounded-full text-gray-400 group-hover:text-[#1677ff] group-hover:bg-blue-50 transition-colors">
            <Plus size={20} />
          </div>
          <span className="text-xs text-gray-500 mt-2 font-medium group-hover:text-gray-900">Add Image</span>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            accept="image/*"
            multiple
          />
        </div>
      </div>
      <p className="text-[11px] text-gray-400 italic mt-1">* First image will be used as the feature image.</p>
    </div>
  );
}
