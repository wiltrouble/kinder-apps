"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import type { NavItemConfig } from "@/types/navigation";

interface NavItemProps {
  item: NavItemConfig;
  active: boolean;
  collapsed?: boolean;
  onSelect?: () => void;
}

export const NavItem = ({
  item,
  active,
  collapsed = false,
  onSelect,
}: NavItemProps) => {
  const Icon = item.icon;

  const className = cn(
    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
    collapsed && "justify-center px-2",
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
    item.disabled && "pointer-events-none opacity-50",
  );

  const content = (
    <>
      <Icon className="size-4 shrink-0" aria-hidden />
      {!collapsed ? (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {item.badge}
            </span>
          ) : null}
        </>
      ) : null}
    </>
  );

  if (item.disabled) {
    return (
      <span
        className={className}
        aria-disabled
        title={collapsed ? item.label : undefined}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </Link>
  );
};
