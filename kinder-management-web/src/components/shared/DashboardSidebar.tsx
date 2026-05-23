"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BrandMark } from "@/components/shared/BrandMark";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { href: routes.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: "#students", label: "Students", icon: GraduationCap, disabled: true },
  { href: "#classrooms", label: "Classrooms", icon: Users, disabled: true },
  { href: "#calendar", label: "Calendar", icon: CalendarDays, disabled: true },
  { href: "#settings", label: "Settings", icon: Settings, disabled: true },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <BrandMark />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = !item.disabled && pathname === item.href;
          const Icon = item.icon;
          const className = cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            item.disabled && "pointer-events-none opacity-50",
          );

          if (item.disabled) {
            return (
              <span key={item.href} className={className} aria-disabled>
                <Icon className="size-4" aria-hidden />
                <span className="flex-1">{item.label}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Soon
                </span>
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              <Icon className="size-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t px-6 py-4 text-xs text-muted-foreground">
        Sidebar placeholder
      </div>
    </aside>
  );
};
