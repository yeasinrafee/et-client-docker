import s1 from "@/assets/images/services/s1.png";
import s2 from "@/assets/images/services/s2.png";
import s3 from "@/assets/images/services/s3.png";
import s4 from "@/assets/images/services/s4.png";
import s5 from "@/assets/images/services/s5.png";

export const productsData = [
  {
    id: 1,
    slug: "workflow-system-energy",
    title: "Workflow System Energy",
    category: "OIL & GAS",
    tags: ["WEB DEVELOPMENT"],
    images: [s1, s2, s3, s4],
    description:
      "A comprehensive workflow management system for energy sector optimization.",
    fullDescription:
      "Our Workflow System for the Energy sector is a state-of-the-art platform designed to streamline complex operations in the oil and gas industry. It provides real-time monitoring, automated task allocation, and deep analytical insights to reduce downtime and maximize productivity.",
    challenge:
      "The client was managing complex pipeline operations across 15 remote sites using manual spreadsheets, leading to critical delays and safety risks. They needed a centralized, real-time system to coordinate teams and monitor assets.",
    solution:
      "We built a full-stack platform with IoT-connected sensors for live pipeline monitoring, an AI-powered scheduling engine, and a role-based dashboard for field operators and management. The system integrates with existing SCADA infrastructure.",
    features: [
      "Real-time Pipeline Monitoring",
      "Automated Maintenance Scheduling",
      "Resource Allocation AI",
      "Safety Compliance Tracking",
      "IoT Sensor Integration",
      "Predictive Failure Analysis",
    ],
    featureImage: s1,
    technologies: ["Next.js", "Python", "PostgreSQL", "AWS IoT"],
    client: "Global Energy Corp",
    launchDate: "2024-03-15",
    duration: "8 months",
    teamSize: 12,
    results:
      "25% increase in operational efficiency within the first 6 months.",
    keyMetrics: [
      { label: "Efficiency Boost", value: "25%" },
      { label: "Downtime Reduced", value: "40%" },
      { label: "Sites Connected", value: "15+" },
      { label: "Daily Active Users", value: "500+" },
    ],
    testimonial: {
      quote:
        "This platform transformed how we operate. The real-time visibility alone has saved us millions in preventable downtime.",
      author: "James Carter",
      role: "CTO, Global Energy Corp",
    },
  },
  {
    id: 2,
    slug: "saas-for-end-to-end-analytics",
    title: "SaaS for End to-End Analytics",
    category: "ECOMMERCE",
    tags: ["CUSTOM SOFTWARE"],
    images: [s2, s3, s4],
    description:
      "Real-time analytics platform for modern e-commerce businesses.",
    fullDescription:
      "This SaaS platform offers an all-in-one solution for e-commerce brands to track their customer journey from landing to conversion. It integrates with major marketplaces and provides predictive modeling to forecast inventory needs and marketing spend.",
    challenge:
      "E-commerce brands struggled with fragmented data across Shopify, Amazon, and social platforms. They had no single source of truth for customer behavior, leading to poor inventory decisions and wasted ad spend.",
    solution:
      "We developed a unified analytics engine that pulls data from 20+ integrations into a single dashboard. A TensorFlow-based predictive model forecasts demand and recommends optimal marketing budgets in real time.",
    features: [
      "Multi-channel Data Integration",
      "Predictive Inventory Forecasting",
      "Customer Lifetime Value Modeling",
      "Automated Marketing Reports",
      "Sentiment Analysis Engine",
      "Market Trend Correlation",
    ],
    featureImage: s3,
    technologies: ["React", "Node.js", "BigQuery", "TensorFlow"],
    client: "ShopSmart Inc.",
    launchDate: "2023-11-20",
    duration: "6 months",
    teamSize: 8,
    results: "Helped clients reduce inventory holding costs by 15% on average.",
    keyMetrics: [
      { label: "Cost Reduction", value: "15%" },
      { label: "Integrations", value: "20+" },
      { label: "Data Points/Day", value: "2M+" },
      { label: "Client Brands", value: "50+" },
    ],
    testimonial: {
      quote:
        "Finally, one dashboard to rule them all. Our inventory accuracy improved overnight and ad spend became truly data-driven.",
      author: "Sarah Kim",
      role: "VP of Operations, ShopSmart Inc.",
    },
  },
  {
    id: 3,
    slug: "workload-management",
    title: "Workload Management",
    category: "WEB DEVELOPMENT",
    tags: ["CUSTOM SOFTWARE"],
    images: [s3, s1, s5],
    description:
      "Efficient workload distribution and tracking for enterprise teams.",
    fullDescription:
      "Our Workload Management tool is designed for large-scale enterprise teams to manage resources effectively. It uses a custom-built algorithm to distribute tasks based on team member capacity, skill set, and priority.",
    challenge:
      "A multinational enterprise with 2,000+ employees had no visibility into team capacity. Project managers double-booked resources and missed deadlines routinely, costing the company an estimated $3M annually in overruns.",
    solution:
      "We built a dynamic resource-leveling engine with skill-based routing and interactive Gantt charts. The system automatically redistributes tasks when team members are overloaded and provides real-time capacity heatmaps.",
    features: [
      "Dynamic Resource Leveling",
      "Skill-based Task Routing",
      "Interactive Gantt Charts",
      "Time Tracking & Billing",
      "Automated Capacity Planning",
      "Cross-departmental Workflows",
    ],
    featureImage: s1,
    technologies: ["TypeScript", "GraphQL", "MongoDB", "Docker"],
    client: "Horizon Enterprises",
    launchDate: "2024-01-10",
    duration: "10 months",
    teamSize: 15,
    results: "Reduced project overruns by 40% across all departments.",
    keyMetrics: [
      { label: "Overruns Reduced", value: "40%" },
      { label: "Users Managed", value: "2000+" },
      { label: "Tasks Automated", value: "5K/mo" },
      { label: "Cost Savings", value: "$3M" },
    ],
    testimonial: {
      quote:
        "The capacity heatmaps alone changed how our PMs plan sprints. We haven't had a major deadline miss since deployment.",
      author: "Michael Torres",
      role: "Director of Engineering, Horizon Enterprises",
    },
  },
  {
    id: 4,
    slug: "fintech-mobile-wallet",
    title: "Fintech Mobile Wallet",
    category: "FINANCE",
    tags: ["MOBILE DEVELOPMENT"],
    images: [s4, s5, s1],
    description:
      "Secure and intuitive mobile payment solution with global reach.",
    fullDescription:
      "A next-generation mobile wallet that supports multi-currency transactions, instant peer-to-peer transfers, and integrated savings goals. Built with bank-grade security and a focus on user experience.",
    challenge:
      "The fintech startup needed to launch a mobile wallet that met PCI-DSS and regional banking compliance across 12 countries, while delivering a consumer-grade experience that could compete with established players.",
    solution:
      "We architected a microservices backend in Go for sub-100ms transaction times, implemented biometric auth with hardware security modules, and designed a gamified savings feature that increased retention by 60%.",
    features: [
      "Biometric Authentication",
      "Instant Multi-currency Exchange",
      "Smart Savings Goals",
      "Contactless NFC Payments",
      "AI Fraud Detection",
      "Personalized Financial Insights",
    ],
    featureImage: s5,
    technologies: ["React Native", "Go", "Redis", "Kubernetes"],
    client: "SecurePay Finance",
    launchDate: "2024-02-05",
    duration: "12 months",
    teamSize: 18,
    results: "Reached 1 million active users within 4 months of launch.",
    keyMetrics: [
      { label: "Active Users", value: "1M+" },
      { label: "Countries", value: "12" },
      { label: "Transactions/Sec", value: "10K" },
      { label: "App Rating", value: "4.8★" },
    ],
    testimonial: {
      quote:
        "The speed and security they delivered are world-class. Our users love the savings gamification — it's our biggest differentiator.",
      author: "Elena Vasquez",
      role: "CEO, SecurePay Finance",
    },
  },
  {
    id: 5,
    slug: "healthtech-patient-portal",
    title: "HealthTech Patient Portal",
    category: "HEALTHCARE",
    tags: ["WEB DEVELOPMENT"],
    images: [s5, s4, s2],
    description:
      "Centralized platform for patient management and digital health records.",
    fullDescription:
      "A HIPAA-compliant patient portal that allows users to manage their appointments, view medical history, and communicate securely with healthcare providers. It features an integrated symptom checker and medication reminders.",
    challenge:
      "Hospital partners were losing patients due to poor digital experiences. Appointment no-shows were at 30%, and providers spent hours on manual record retrieval. They needed a modern portal that patients would actually use.",
    solution:
      "We delivered a HIPAA-compliant portal with encrypted messaging, e-prescriptions, and video consultations. Smart reminders reduced no-shows, and a patient-facing symptom checker triaged cases before appointments.",
    features: [
      "Secure Encrypted Messaging",
      "E-Prescription Integration",
      "Telehealth Video Consultations",
      "Patient Data Privacy Controls",
      "Smart Symptom Checker",
      "Automated Appointment Reminders",
    ],
    featureImage: s4,
    technologies: ["Next.js", "Java Spring Boot", "Oracle", "Azure"],
    client: "MediLife Healthcare",
    launchDate: "2023-09-12",
    duration: "9 months",
    teamSize: 14,
    results: "Improved patient engagement scores by 35% for hospital partners.",
    keyMetrics: [
      { label: "Engagement Up", value: "35%" },
      { label: "No-shows Down", value: "60%" },
      { label: "Hospitals", value: "25+" },
      { label: "Patients Served", value: "100K+" },
    ],
    testimonial: {
      quote:
        "Patient satisfaction scores jumped from 3.2 to 4.6 stars. The telehealth integration was a game-changer during peak seasons.",
      author: "Dr. Priya Sharma",
      role: "CMO, MediLife Healthcare",
    },
  },
  {
    id: 6,
    slug: "ai-logistics-optimizer",
    title: "AI Logistics Optimizer",
    category: "LOGISTICS",
    tags: ["CUSTOM SOFTWARE"],
    images: [s1, s3, s4],
    description:
      "Artificial intelligence driven supply chain and route optimization.",
    fullDescription:
      "A powerful AI engine that optimizes logistics routes in real-time based on traffic, weather, and delivery priorities. It helps logistics companies significantly reduce fuel consumption and improve delivery times.",
    challenge:
      "The logistics company operated a fleet of 500+ vehicles with static routing, resulting in excessive fuel costs and missed delivery windows. Real-time conditions like traffic and weather were completely ignored.",
    solution:
      "We built a C++ powered optimization engine with Python ML models that process live GPS, traffic, and weather data to generate dynamic routes every 30 seconds. An automated dispatch system assigns drivers intelligently.",
    features: [
      "Dynamic Route Planning",
      "Real-time Fleet Tracking",
      "Fuel Consumption Analytics",
      "Automated Dispatching",
      "Weather Pattern Prediction",
      "Traffic Anomaly Detection",
    ],
    featureImage: s3,
    technologies: ["Python", "C++", "Apache Kafka", "Google Cloud"],
    client: "SwiftLink Logistics",
    launchDate: "2024-04-01",
    duration: "7 months",
    teamSize: 10,
    results: "Reduced average delivery time by 20% across urban areas.",
    keyMetrics: [
      { label: "Delivery Speed", value: "+20%" },
      { label: "Fuel Savings", value: "18%" },
      { label: "Fleet Size", value: "500+" },
      { label: "Routes/Day", value: "10K+" },
    ],
    testimonial: {
      quote:
        "Our drivers are happier, our fuel bill dropped by 18%, and customers get their packages faster. The ROI was immediate.",
      author: "Robert Chang",
      role: "COO, SwiftLink Logistics",
    },
  },
  {
    id: 7,
    slug: "edtech-learning-system",
    title: "EdTech Learning System",
    category: "EDUCATION",
    tags: ["WEB DEVELOPMENT"],
    images: [s2, s5, s1],
    description:
      "Interactive learning management system for schools and universities.",
    fullDescription:
      "An all-encompassing learning management system that supports virtual classrooms, interactive assignments, and comprehensive grading systems. Designed to facilitate seamless communication between students and educators.",
    challenge:
      "Universities needed to rapidly scale remote learning during a global shift to digital education. Existing LMS tools were clunky, couldn't handle live video, and lacked collaborative features students expected.",
    solution:
      "We built a modern LMS with WebRTC-powered virtual classrooms, an interactive quiz engine with anti-cheating measures, and collaborative study groups with real-time document editing.",
    features: [
      "Virtual Classroom Integration",
      "Interactive Quiz Engine",
      "Student Progress Tracking",
      "Collaborative Study Groups",
      "Plagiarism Detection AI",
      "Gamified Learning Modules",
    ],
    featureImage: s2,
    technologies: ["React", "PHP Laravel", "MySQL", "AWS"],
    client: "EduStream University",
    launchDate: "2023-08-25",
    duration: "5 months",
    teamSize: 9,
    results: "Facilitated remote learning for over 50,000 students worldwide.",
    keyMetrics: [
      { label: "Students Served", value: "50K+" },
      { label: "Universities", value: "12" },
      { label: "Course Completion", value: "+45%" },
      { label: "Satisfaction", value: "4.7★" },
    ],
    testimonial: {
      quote:
        "The collaborative study groups feature transformed student engagement. Completion rates improved dramatically across all departments.",
      author: "Prof. David Lee",
      role: "Dean of Digital Learning, EduStream University",
    },
  },
  {
    id: 8,
    slug: "real-estate-crm",
    title: "Real Estate CRM",
    category: "REAL ESTATE",
    tags: ["CUSTOM SOFTWARE"],
    images: [s3, s2, s4],
    description:
      "Specialized customer relationship management for property agents.",
    fullDescription:
      "A tailored CRM for the real estate industry that automates lead generation, property listing management, and client follow-ups. Includes integrated virtual tour support and contract automation.",
    challenge:
      "Real estate agents were juggling multiple tools for leads, listings, and contracts. Follow-up rates were inconsistent, and agents lost deals due to slow response times and lack of automation.",
    solution:
      "We created a unified CRM with AI-powered lead scoring, automated follow-up sequences, syndicated listings across 30+ portals, and integrated virtual tours with 360° property walkthroughs.",
    features: [
      "Automated Lead Scoring",
      "Property Listing Syndication",
      "Virtual Tour Integration",
      "E-signature Contract Support",
      "360° Panorama Viewers",
      "Market Valuation Tools",
    ],
    featureImage: s4,
    technologies: ["Vue.js", "Firebase", "Node.js", "Algolia"],
    client: "Elite Properties",
    launchDate: "2024-01-20",
    duration: "6 months",
    teamSize: 7,
    results: "Increased lead conversion rates for agents by 22% on average.",
    keyMetrics: [
      { label: "Conversion Up", value: "22%" },
      { label: "Response Time", value: "-70%" },
      { label: "Agents Using", value: "300+" },
      { label: "Listings Managed", value: "5K+" },
    ],
    testimonial: {
      quote:
        "The automated follow-ups alone doubled our response rate. We close deals faster and never lose track of a hot lead.",
      author: "Amanda Foster",
      role: "Head of Sales, Elite Properties",
    },
  },
  {
    id: 9,
    slug: "cybersecurity-shield",
    title: "CyberSecurity Shield",
    category: "SECURITY",
    tags: ["CUSTOM SOFTWARE"],
    images: [s4, s1, s3],
    description:
      "Advanced threat detection and prevention system for corporations.",
    fullDescription:
      "An enterprise-level cybersecurity platform that uses machine learning to detect and neutralize threats before they impact the network. Provides 24/7 monitoring and automated incident response.",
    challenge:
      "The corporation experienced multiple near-breach incidents due to outdated signature-based detection. Their security team was overwhelmed with false positives and lacked automated response capabilities.",
    solution:
      "We deployed an ML-based anomaly detection system trained on the client's network patterns, coupled with an automated incident response pipeline that isolates threats in under 30 seconds.",
    features: [
      "ML-based Threat Detection",
      "Automated Incident Response",
      "Network Traffic Analysis",
      "Vulnerability Scanning",
      "Zero-day Attack Prevention",
      "Endpoint Security Monitoring",
    ],
    featureImage: s1,
    technologies: ["Python", "Rust", "Elasticsearch", "Splunk"],
    client: "DataGuard Corp",
    launchDate: "2023-12-05",
    duration: "11 months",
    teamSize: 16,
    results:
      "Prevented over 5,000 potential security breaches in its first year.",
    keyMetrics: [
      { label: "Threats Blocked", value: "5000+" },
      { label: "Response Time", value: "<30s" },
      { label: "False Positives", value: "-85%" },
      { label: "Uptime", value: "99.99%" },
    ],
    testimonial: {
      quote:
        "The automated response system neutralized a zero-day threat before our team even saw the alert. That alone justified the investment.",
      author: "Daniel Wright",
      role: "CISO, DataGuard Corp",
    },
  },
  {
    id: 10,
    slug: "marketing-automation-pro",
    title: "Marketing Automation Pro",
    category: "MARKETING",
    tags: ["WEB DEVELOPMENT"],
    images: [s5, s2, s3],
    description:
      "All-in-one marketing campaign management and automation tool.",
    fullDescription:
      "A robust marketing automation tool that allows businesses to create, manage, and track multi-channel marketing campaigns from a single dashboard. Includes advanced A/B testing and customer segmentation.",
    challenge:
      "Marketing teams were running campaigns across email, social, and paid channels with no coordination. A/B tests were manual, customer segments were guesswork, and ROI attribution was nearly impossible.",
    solution:
      "We built a unified campaign builder with drag-and-drop workflows, automated A/B testing with statistical significance checks, and ML-powered customer segmentation that dynamically adjusts based on behavior.",
    features: [
      "Multi-channel Campaign Builder",
      "Advanced Customer Segmentation",
      "A/B Testing Engine",
      "Conversion Tracking ROI",
      "Dynamic Content Personalization",
      "Behavioral Trigger Automation",
    ],
    featureImage: s5,
    technologies: ["Next.js", "Ruby on Rails", "PostgreSQL", "Heroku"],
    client: "GrowthBoost Agency",
    launchDate: "2024-02-28",
    duration: "8 months",
    teamSize: 11,
    results: "Helped clients increase their marketing ROI by 30% on average.",
    keyMetrics: [
      { label: "ROI Increase", value: "30%" },
      { label: "Campaigns/Mo", value: "500+" },
      { label: "Email Open Rate", value: "+25%" },
      { label: "Client Agencies", value: "40+" },
    ],
    testimonial: {
      quote:
        "The automated segmentation is incredibly accurate. Our email open rates jumped 25% in the first month without changing our content strategy.",
      author: "Lisa Morgan",
      role: "Marketing Director, GrowthBoost Agency",
    },
  },
];
