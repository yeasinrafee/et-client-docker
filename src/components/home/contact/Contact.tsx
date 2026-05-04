"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@/components/shared/layout/Container";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  budget: z.string().min(1, "Please enter your expected budget"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Data:", data);
    alert("Message sent successfully! (Check console)");
    reset();
  };

  return (
    <section id="contact" className="relative z-20 -mb-20 pt-12 sm:pt-16 ">
      <Container>
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[60%] mx-auto bg-secondary p-6 sm:p-10 md:p-12 lg:p-16 rounded-[28px] sm:rounded-[36px] md:rounded-[48px] shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight mb-8 sm:mb-10 md:mb-12">
            Start growing your business with us
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Name Field */}
            <div className="space-y-2 group">
              <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full bg-transparent border-b border-white/10 py-0.5 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Phone Field */}
              <div className="space-y-2 group">
                <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full bg-transparent border-b border-white/10 py-0.5 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-transparent border-b border-white/10 py-0.5 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Expected Budget Field */}
            <div className="space-y-2 group">
              <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
                Expected Budget
              </label>
              <input
                {...register("budget")}
                type="text"
                className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg"
              />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2 group">
              <label className="text-white/40 text-xs sm:text-sm font-medium tracking-wide block transition-colors group-focus-within:text-primary">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full bg-transparent border-b border-white/10 py-0.5 text-white focus:outline-none focus:border-primary transition-colors text-base sm:text-lg resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    {...register("consent")}
                    type="checkbox"
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white/40 text-xs sm:text-sm leading-tight transition-colors group-hover:text-white/60">
                  I agree that my personal information will be processed and
                  stored by Orizon.
                </span>
              </label>
              {errors.consent && (
                <p className="text-red-500 text-xs">{errors.consent.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all transform hover:scale-105 shadow-xl shadow-orange-500/10 active:scale-95"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
