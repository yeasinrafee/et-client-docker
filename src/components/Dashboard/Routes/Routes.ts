import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  Package,
  Layers,
  MessageSquare,
  Star,
  PlaySquare,
  ListTree
} from "lucide-react";

export const routes = () => [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    active: true,
  },
  {
    icon: Users,
    label: "Admins",
    href: "/dashboard/admins",
  },
  {
    icon: Briefcase,
    label: "Services",
    href: "/dashboard/services",
  },
  {
    icon: Building2,
    label: "Industries",
    href: "/dashboard/industries",
  },
  {
    icon: ListTree,
    label: "Product Categories",
    href: "/dashboard/product-categories",
  },
  {
    icon: Package,
    label: "Products",
    href: "/dashboard/products",
  },
  {
    icon: Layers,
    label: "Demo Categories",
    href: "/dashboard/demo-categories",
  },
  {
    icon: PlaySquare,
    label: "Demos",
    href: "/dashboard/demos",
  },
  {
    icon: MessageSquare,
    label: "Customer Messages",
    href: "/dashboard/customer-messages",
  },
  {
    icon: Star,
    label: "Reviews",
    href: "/dashboard/reviews",
  },
];
