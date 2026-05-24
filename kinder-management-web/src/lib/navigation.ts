import {
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";

import { permissions } from "@/lib/permissions";
import { routes } from "@/lib/routes";
import type { NavigationConfig, NavItemConfig } from "@/types/navigation";

export const navigationConfig: NavigationConfig = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: routes.dashboard,
        icon: LayoutDashboard,
        matchMode: "exact",
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    items: [
      {
        label: "Users",
        href: routes.users,
        icon: Users,
        permissions: [permissions.users.read],
        matchMode: "startsWith",
      },
      {
        label: "Roles",
        href: routes.roles,
        icon: ShieldCheck,
        permissions: [permissions.roles.read],
        matchMode: "startsWith",
      },
    ],
  },
];

export const isNavItemActive = (
  item: NavItemConfig,
  pathname: string,
): boolean => {
  if (item.matchMode === "startsWith") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  return pathname === item.href;
};
