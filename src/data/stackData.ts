// Web Platform Icons
import f1 from "@/assets/icon/front/f1.png";
import f2 from "@/assets/icon/front/f2.png";
import f3 from "@/assets/icon/front/f3.png";
import f4 from "@/assets/icon/front/f4.png";
import f5 from "@/assets/icon/front/f5.png";
import f6 from "@/assets/icon/front/f6.png";
import f7 from "@/assets/icon/front/f7.png";
import f8 from "@/assets/icon/front/f8.png";

import b1 from "@/assets/icon/back/b1.png";
import b2 from "@/assets/icon/back/b2.png";
import b3 from "@/assets/icon/back/b3.png";
import b4 from "@/assets/icon/back/b4.png";

// Cloud & DevOps Icons
import c1 from "@/assets/icon/cloud/c1.png";
import c2 from "@/assets/icon/cloud/c2.png";
import c3 from "@/assets/icon/cloud/c3.png";
import c4 from "@/assets/icon/cloud/c4.png";

// Database Icons
import d1 from "@/assets/icon/database/d1.png";
import d2 from "@/assets/icon/database/d2.png";
import d3 from "@/assets/icon/database/d3.png";
import d4 from "@/assets/icon/database/d4.png";

// Mobile App Icons
import a1 from "@/assets/icon/apk/a1.png";
import a2 from "@/assets/icon/apk/a2.png";
import a3 from "@/assets/icon/apk/a3.png";
import a4 from "@/assets/icon/apk/a4.png";

export const stackData = [
  {
    id: "01",
    title: "Web Platform",
    subSections: [
      {
        title: "Front-End",
        items: [
          { name: "GRAPHQL", icon: f1 },
          { name: "REACT HOOK", icon: f2 },
          { name: "ANT DESIGN", icon: f3 },
          { name: "MATERIAL UI", icon: f4 },
          { name: "TYPESCRIPT", icon: f5 },
          { name: "NEXT.JS", icon: f6 },
          { name: "REACT.JS", icon: f7 },
          { name: "REST API", icon: f8 },
        ],
      },
      {
        title: "Back-End",
        items: [
          { name: "NODE.JS", icon: b1 },
          { name: "PHP", icon: b2 },
          { name: "LARAVEL", icon: b3 },
          { name: "JAVA", icon: b4 },
        ],
      },
    ],
  },
  {
    id: "02",
    title: "Cloud & DevOps",
    subSections: [
      {
        title: "Cloud & DevOps Stack",
        items: [
          { name: "NGINX", icon: c1 },
          { name: "DOCKER", icon: c2 },
          { name: "KUBERNETES", icon: c3 },
          { name: "AZURE", icon: c4 },
        ],
      },
    ],
  },
  {
    id: "03",
    title: "Database",
    subSections: [
      {
        title: "Database Stack",
        items: [
          { name: "MYSQL", icon: d1 },
          { name: "POSTGRESQL", icon: d2 },
          { name: "MONGODB", icon: d3 },
          { name: "SOLR", icon: d4 },
        ],
      },
    ],
  },
  {
    id: "04",
    title: "Mobile Apps",
    subSections: [
      {
        title: "Mobile Apps Stack",
        items: [
          { name: "KOTLIN", icon: a1 },
          { name: "GO", icon: a2 },
          { name: "FLUTTER", icon: a3 },
          { name: "SWIFT", icon: a4 },
        ],
      },
    ],
  },
];
