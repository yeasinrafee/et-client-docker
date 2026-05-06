import s1 from "@/assets/images/services/s1.png";
import s2 from "@/assets/images/services/s2.png";
import s3 from "@/assets/images/services/s3.png";
import s4 from "@/assets/images/services/s4.png";
import s5 from "@/assets/images/services/s5.png";

export const demosData = [
  {
    id: 1,
    slug: "e-commerce-dashboard",
    title: "E-Commerce Admin Dashboard",
    category: "ADMIN PANEL",
    tags: ["WEB APP"],
    images: [s1, s2, s3, s4, s5],
    featureImage: s1,
    description:
      "A comprehensive admin dashboard for managing e-commerce operations, featuring sales analytics, inventory management, and user roles.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    features: [
      "Real-time Sales Analytics",
      "Interactive Charts & Graphs",
      "Inventory Management System",
      "User Role & Access Control",
    ],
    demoUrl: "https://example.com/demo1",
  },
  {
    id: 2,
    slug: "healthcare-patient-portal",
    title: "Healthcare Patient Portal",
    category: "HEALTHCARE",
    tags: ["PORTAL"],
    images: [s2, s4, s5],
    featureImage: s2,
    description:
      "A secure patient portal allowing users to book appointments, view medical records, and communicate with healthcare providers.",
    technologies: ["Vue.js", "Nuxt.js", "SCSS", "Firebase"],
    features: [
      "Secure Authentication",
      "Appointment Booking System",
      "Medical Record Viewer",
      "Real-time Messaging",
    ],
    demoUrl: "https://example.com/demo2",
  },
  {
    id: 3,
    slug: "fintech-landing-page",
    title: "Fintech Landing Page",
    category: "FINANCE",
    tags: ["LANDING PAGE"],
    images: [s3, s1, s4],
    featureImage: s3,
    description:
      "A high-converting, modern landing page for a fintech startup featuring dynamic animations, interactive pricing, and seamless integrations.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    features: [
      "High-performance Animations",
      "Interactive Pricing Toggle",
      "Responsive Design",
      "SEO Optimized",
    ],
    demoUrl: "https://example.com/demo3",
  },
  {
    id: 4,
    slug: "real-estate-directory",
    title: "Real Estate Property Directory",
    category: "REAL ESTATE",
    tags: ["DIRECTORY"],
    images: [s4, s2, s5],
    featureImage: s4,
    description:
      "A robust directory application for real estate listings, featuring advanced search filters, interactive maps, and detailed property pages.",
    technologies: ["Next.js", "Mapbox", "Prisma", "PostgreSQL"],
    features: [
      "Advanced Search Filters",
      "Interactive Map View",
      "Detailed Property Listings",
      "Agent Contact Forms",
    ],
    demoUrl: "https://example.com/demo4",
  },
  {
    id: 5,
    slug: "saas-analytics-tool",
    title: "SaaS Analytics Platform",
    category: "ANALYTICS",
    tags: ["SAAS"],
    images: [s5, s1, s3],
    featureImage: s5,
    description:
      "A powerful analytics tool designed for SaaS companies to track user engagement, churn rates, and subscription metrics.",
    technologies: ["React", "Redux", "Material UI", "D3.js"],
    features: [
      "Customizable Dashboards",
      "User Behavior Tracking",
      "Subscription Metric Analysis",
      "Automated Reporting",
    ],
    demoUrl: "https://example.com/demo5",
  },
];
