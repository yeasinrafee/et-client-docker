import Image from "next/image";
import Link from "next/link";
import notFoundImg from "@/assets/images/notFound.gif";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-secondary justify-center px-4 text-center transition-colors duration-300">
      <Image
        src={notFoundImg}
        alt="Page not found"
        width={500}
        height={500}
        className="mb-6"
        priority
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 dark:hover:bg-blue-500 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
