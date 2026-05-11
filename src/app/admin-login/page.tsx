"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/logo4.png";
import { MdArrowBack } from "react-icons/md";
import { postAPI } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const response = await postAPI("/auth/login", data);

    if (response?.success) {
      const { accessToken, admin } = response.data;
      if (admin.role === "admin" || admin.role === "superAdmin") {
        setAuth(accessToken, admin);
        router.push("/dashboard");
      } else {
        setError("You are not authorized to access the admin panel.");
        setIsModalOpen(true);
      }
    } else {
      setError(
        response?.message || "Login failed. Please check your credentials.",
      );
      setIsModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-secondary p-8 sm:p-10 rounded-[28px] sm:rounded-[36px]">
        <div className="mb-8 text-center flex flex-col items-center">
          <Image
            src={Logo}
            alt="Emperal Tech Logo"
            width={250}
            height={50}
            priority
            className="w-auto h-12 md:h-14 mb-6"
          />
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Admin Login
          </h2> */}
          <p className="text-white/60 mt-2 text-sm">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2 group">
            <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2 group">
            <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent border-b border-white/10 py-1 pr-10 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 mt-8 rounded-full text-sm font-bold tracking-widest uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-primary transition-colors text-sm"
          >
            <MdArrowBack className="text-lg" />
            Back to home
          </Link>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white/90 text-secondary border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-500">
              Login Error
            </DialogTitle>
            <DialogDescription className="text-secondary/70">
              {error}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminLogin;
