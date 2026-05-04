import s1 from "@/assets/images/services/s1.png";
import s2 from "@/assets/images/services/s2.png";
import s3 from "@/assets/images/services/s3.png";
import s4 from "@/assets/images/services/s4.png";
import s5 from "@/assets/images/services/s5.png";

export const servicesData = [
  {
    id: "01",
    slug: "evaluation-and-design",
    title: "Evaluation & Design",
    tags: [
      "RESEARCH & DEVELOPMENT",
      "SCOPING SESSION",
      "UI REVIEW",
      "UI DESIGN",
      "BRANDING",
      "PRODUCT DESIGN",
      "RAPID PROTOTYPING",
    ],
    description:
      "We provide innovative software solutions to a wide range of industries, helping businesses transform their operations and achieve their goals through meticulous evaluation and user-centric design processes.",
    image: s1,
    images: [s1, s2, s3],
    longDescription:
      "Our Evaluation & Design service is the cornerstone of building successful digital products. We don't just jump into code; we take the time to understand your business goals, user needs, and market landscape. Through rigorous research, collaborative scoping sessions, and rapid prototyping, we craft beautiful, intuitive, and highly functional designs that resonate with your target audience and set a solid foundation for development.",
    benefits: [
      { title: "Reduced Development Costs", description: "Catching issues early in the design phase prevents expensive code rewrites later." },
      { title: "Enhanced User Satisfaction", description: "User-centric design ensures your product is intuitive and a joy to use." },
      { title: "Faster Time-to-Market", description: "Clear prototypes and requirements streamline the development process." }
    ],
    process: [
      { step: "1", title: "Discovery & Research", description: "Understanding your vision, target audience, and market competitors." },
      { step: "2", title: "UX Strategy & Wireframing", description: "Mapping out user journeys and structural layouts." },
      { step: "3", title: "UI Design & Branding", description: "Creating high-fidelity, visually stunning interfaces." },
      { step: "4", title: "Prototyping & Testing", description: "Building interactive models to validate concepts before coding." }
    ],
    features: [
      "Comprehensive User Personas",
      "Interactive Figma Prototypes",
      "Design System Creation",
      "Accessibility Compliance Check",
      "Usability Testing Reports"
    ]
  },
  {
    id: "02",
    slug: "custom-software",
    title: "Custom Software",
    tags: [
      "ENTERPRISE SOLUTIONS",
      "SAAS DEVELOPMENT",
      "CLOUD NATIVE",
      "MICROSERVICES",
      "API INTEGRATION",
    ],
    description:
      "Our team builds scalable, high-performance custom software tailored to your unique business requirements, ensuring long-term success and competitive advantage.",
    image: s2,
    images: [s2, s4, s5],
    longDescription:
      "Off-the-shelf software rarely fits the complex, unique workflows of a growing enterprise. Our Custom Software development service bridges that gap. We engineer robust, scalable, and secure applications tailored specifically to your operational needs. Whether you're looking to automate internal processes, build a scalable SaaS platform, or modernize legacy systems, our expert engineering team utilizes the latest cloud-native architectures and microservices to deliver software that drives real business value.",
    benefits: [
      { title: "Perfect Fit for Your Workflows", description: "Software designed exactly how your business operates, without compromises." },
      { title: "Scalability on Demand", description: "Cloud-native architectures that grow seamlessly with your business." },
      { title: "Competitive Advantage", description: "Proprietary tools that give you an edge over competitors using generic software." }
    ],
    process: [
      { step: "1", title: "Requirements Gathering", description: "Deep dive into your business logic and technical needs." },
      { step: "2", title: "Architecture Design", description: "Planning scalable infrastructure and tech stack selection." },
      { step: "3", title: "Agile Development", description: "Iterative coding sprints with regular client feedback loops." },
      { step: "4", title: "Deployment & Integration", description: "Seamless launch and integration with existing systems." }
    ],
    features: [
      "Microservices Architecture",
      "Custom API Development",
      "High-security Standards (SOC2 Compliant ready)",
      "Legacy System Migration",
      "Real-time Data Processing"
    ]
  },
  {
    id: "03",
    slug: "web-development",
    title: "Web Development",
    tags: [
      "REACT / NEXT.JS",
      "NODE.JS",
      "TYPESCRIPT",
      "E-COMMERCE",
      "CMS SOLUTIONS",
      "PWA",
    ],
    description:
      "Crafting modern, responsive, and blazing-fast web applications using the latest technologies to deliver an exceptional user experience across all devices.",
    image: s3,
    images: [s3, s1, s2],
    longDescription:
      "Your website is often the first interaction a customer has with your brand. We build web applications that leave a lasting impression. Using modern frameworks like Next.js and React, coupled with robust backend solutions, we create blazing-fast, highly interactive, and SEO-optimized web platforms. From complex e-commerce systems to dynamic content management portals, our web development service ensures your online presence is powerful, secure, and accessible on any device.",
    benefits: [
      { title: "Lightning Fast Performance", description: "Optimized load times that improve SEO rankings and user retention." },
      { title: "Omnichannel Accessibility", description: "Responsive designs that look perfect on desktops, tablets, and smartphones." },
      { title: "SEO Optimized from the Start", description: "Built with best practices to ensure high visibility on search engines." }
    ],
    process: [
      { step: "1", title: "Technical Scoping", description: "Defining the right framework and database for your project." },
      { step: "2", title: "Frontend Implementation", description: "Translating designs into pixel-perfect, responsive code." },
      { step: "3", title: "Backend & API Integration", description: "Connecting databases, third-party services, and business logic." },
      { step: "4", title: "QA & Performance Tuning", description: "Rigorous testing for speed, security, and cross-browser compatibility." }
    ],
    features: [
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Headless CMS Integration",
      "Progressive Web App (PWA) Capabilities",
      "Advanced E-commerce Functionality",
      "End-to-End Type Safety (TypeScript)"
    ]
  },
  {
    id: "04",
    slug: "mobile-development",
    title: "Mobile Development",
    tags: [
      "REACT NATIVE",
      "IOS DEVELOPMENT",
      "ANDROID DEVELOPMENT",
      "CROSS-PLATFORM",
      "APP STORE OPTIMIZATION",
    ],
    description:
      "Developing native and cross-platform mobile applications that are intuitive, secure, and highly engaging for your users, from concept to deployment.",
    image: s4,
    images: [s4, s5, s3],
    longDescription:
      "Reach your users wherever they are with our premier Mobile Development services. We specialize in building high-performance iOS and Android applications. Whether you need a cross-platform solution using React Native for faster time-to-market or a fully native app for maximum performance, we deliver seamless mobile experiences. We handle the entire lifecycle, from UX design tailored for touch interfaces to navigating the complexities of App Store and Google Play submissions.",
    benefits: [
      { title: "Wider Market Reach", description: "Engage users directly on the devices they use most." },
      { title: "Cost-Effective Cross-Platform Options", description: "Build once, deploy everywhere without sacrificing quality." },
      { title: "Enhanced Engagement", description: "Leverage push notifications and device hardware for deeper user interaction." }
    ],
    process: [
      { step: "1", title: "Mobile Strategy", description: "Deciding between native vs. cross-platform and defining core features." },
      { step: "2", title: "Mobile UI/UX Design", description: "Designing intuitive, thumb-friendly interfaces following platform guidelines." },
      { step: "3", title: "App Development", description: "Writing robust code with smooth animations and state management." },
      { step: "4", title: "Store Submission", description: "Handling compliance, provisioning, and app store optimization (ASO)." }
    ],
    features: [
      "Offline Functionality",
      "Push Notifications Integration",
      "Biometric Authentication",
      "In-App Purchases & Subscriptions",
      "Hardware Integration (Camera, GPS, Bluetooth)"
    ]
  },
  {
    id: "05",
    slug: "maintenance-and-support",
    title: "Maintenance & Support",
    tags: [
      "24/7 MONITORING",
      "BUG FIXING",
      "PERFORMANCE OPTIMIZATION",
      "SECURITY UPDATES",
      "SYSTEM UPGRADES",
    ],
    description:
      "Ensuring your software remains reliable, secure, and up-to-date with our comprehensive maintenance and support services, so you can focus on your core business.",
    image: s5,
    images: [s5, s2, s1],
    longDescription:
      "Software isn't a 'set it and forget it' investment. To maintain its value, security, and performance, continuous care is required. Our Maintenance & Support service acts as your extended technical team. We provide proactive monitoring, rapid bug resolution, security patching, and strategic upgrades. We ensure your critical systems experience maximum uptime and evolve seamlessly alongside your growing business needs, giving you total peace of mind.",
    benefits: [
      { title: "Maximized Uptime", description: "Proactive monitoring prevents minor issues from becoming major outages." },
      { title: "Ironclad Security", description: "Regular updates and patches protect your data from emerging threats." },
      { title: "Predictable IT Costs", description: "Avoid expensive emergency fixes with structured maintenance plans." }
    ],
    process: [
      { step: "1", title: "System Audit", description: "Evaluating current infrastructure and identifying vulnerabilities." },
      { step: "2", title: "Proactive Monitoring Setup", description: "Implementing tools to track performance and errors in real-time." },
      { step: "3", title: "Continuous Maintenance", description: "Regular updates, dependency management, and code refactoring." },
      { step: "4", title: "On-Demand Support", description: "Rapid response SLA for critical bugs or feature enhancements." }
    ],
    features: [
      "24/7 Server Monitoring & Alerts",
      "Automated Security Scanning",
      "Database Optimization & Backups",
      "Version Upgrades & Migration",
      "Dedicated Technical Account Manager"
    ]
  },
];
