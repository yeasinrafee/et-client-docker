"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MdLocationOn, MdEmail } from "react-icons/md";
import Container from "@/components/shared/layout/Container";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const FormInput = ({
  register,
  name,
  type = "text",
  placeholder,
  error,
  isTextarea = false,
  rows = 4,
}: any) => {
  const baseClasses =
    "w-full bg-white/95 border border-accent rounded-xl px-5 py-3.5 text-secondary focus:outline-none focus:border-primary transition-colors text-sm sm:text-base placeholder:text-secondary/40";

  return (
    <div className="space-y-2">
      {isTextarea ? (
        <textarea
          {...register(name)}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
      {error && <p className="text-red-500 text-xs px-1">{error.message}</p>}
    </div>
  );
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/customer-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Message sent successfully! We will get back to you soon.");
        reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="bg-white">
      {/* Top Section: Contact Info & Form */}
      <div className="py-6 md:py-10 lg:py-16 xl:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-primary/5 px-4 py-2 rounded-full inline-block">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary leading-tight">
                  LET'S BUILD SOMETHING GREAT TOGETHER
                </h2>
              </div>

              <p className="text-secondary/70 text-base sm:text-lg leading-relaxed max-w-md">
                Have a project in mind or need assistance with your software?
                Our expert team is here to help you build the perfect solution.
                Reach us by phone, email, or through our online form — and we'll
                respond quickly!
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MdLocationOn className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-1">
                      Location
                    </h4>
                    <p className="text-secondary/60 text-sm">
                      Uttara Sector 9, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MdEmail className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-1">
                      Drop Us a Line
                    </h4>
                    <p className="text-secondary/60 text-sm">
                      hello@emperaltech.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-secondary border border-accent rounded-2xl p-8 sm:p-10 ">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormInput
                  register={register}
                  name="name"
                  placeholder="Your Name *"
                  error={errors.name}
                />
                <FormInput
                  register={register}
                  name="phone"
                  placeholder="Your Phone *"
                  error={errors.phone}
                />
                <FormInput
                  register={register}
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  error={errors.email}
                />
                <FormInput
                  register={register}
                  name="message"
                  isTextarea
                  placeholder="Your Message *"
                  error={errors.message}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed tracking-widest text-sm"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Section: Map iframe */}
      <div className="w-full h-[400px] md:h-[500px] bg-accent">
        <iframe
          src="https://maps.google.com/maps?q=Uttara%20Sector%209%2C%20Dhaka%2C%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Emperal Tech Location"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactUs;
