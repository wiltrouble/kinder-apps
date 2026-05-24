import type { LucideIcon } from "lucide-react";

import type { Permission } from "@/types/role";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  permissions?: Permission[];
  matchMode?: "exact" | "startsWith";
  badge?: string;
  disabled?: boolean;
}

export interface NavSectionConfig {
  id: string;
  label?: string;
  items: NavItemConfig[];
}

export type NavigationConfig = NavSectionConfig[];
