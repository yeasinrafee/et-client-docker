import logoSrc from "@/assets/images/loading.png";
import Image from "next/image";

export default function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Glass-like blur overlay */}
      <div className="absolute inset-0 backdrop-filter backdrop-blur bg-white dark:bg-black bg-opacity-30 z-0" />

      {/* Spinning logo */}
      <div className="animate-spin w-24 h-24 z-10">
        <Image
          src={logoSrc}
          alt="Loading logo"
          width={96}
          height={96}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
