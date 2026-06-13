"use client";

import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useMemo } from "react";

import { BrandMark } from "@/components/shared/BrandMark";
import { LogoutButton } from "@/components/shared/logoutButton";
import { NavItem } from "@/components/shared/navItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePermissions } from "@/hooks/usePermissions";
import { isNavItemActive, navigationConfig } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavSectionConfig } from "@/types/navigation";

interface AppSidebarProps {
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  onNavigate?: () => void;
  className?: string;
  showCollapseControl?: boolean;
}

export const AppSidebar = ({
  collapsed = false,
  onToggleCollapsed,
  onNavigate,
  className,
  showCollapseControl = true,
}: AppSidebarProps) => {
  const pathname = usePathname();
  const { canAny } = usePermissions();

  const visibleSections = useMemo<NavSectionConfig[]>(() => {
    return navigationConfig
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (!item.permissions || item.permissions.length === 0) return true;
          return canAny(item.permissions);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [canAny]);

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col gap-2 border-r bg-sidebar text-sidebar-foreground",
        collapsed ? "w-16" : "w-64",
        "transition-[width] duration-200 ease-in-out",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center px-4",
          collapsed ? "justify-center px-0" : "justify-between",
        )}
      >
        {collapsed ? (
          <BrandMark showName={false} />
        ) : (
          <BrandMark />
        )}
        {showCollapseControl && onToggleCollapsed ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(collapsed && "hidden")}
          >
            <PanelLeftClose className="size-4" aria-hidden />
          </Button>
        ) : null}
      </div>

      {showCollapseControl && collapsed && onToggleCollapsed ? (
        <div className="flex items-center justify-center pb-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapsed}
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="size-4" aria-hidden />
          </Button>
        </div>
      ) : null}

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-2"
      >
        {visibleSections.map((section, index) => (
          <div key={section.id} className="flex flex-col gap-1">
            {!collapsed && section.label ? (
              <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {section.label}
              </p>
            ) : null}
            {collapsed && index > 0 ? (
              <Separator className="my-1" />
            ) : null}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  active={isNavItemActive(item, pathname)}
                  collapsed={collapsed}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div
        className={cn(
          "flex flex-col gap-2 border-t px-3 py-3",
          collapsed && "items-center px-2",
        )}
      >
        <LogoutButton
          variant="ghost"
          size={collapsed ? "icon-sm" : "default"}
          showLabel={!collapsed}
          onAfterLogout={onNavigate}
          className={cn(
            "text-destructive hover:bg-destructive/10 hover:text-destructive",
            collapsed
              ? "justify-center"
              : "h-9 w-full justify-start gap-3 rounded-xl px-3 text-sm font-medium",
          )}
          aria-label="Sign out"
        />
        <p
          className={cn(
            "text-[11px] text-muted-foreground",
            collapsed ? "text-center" : "px-1",
          )}
        >
          {collapsed ? "v0.1" : "Kinder · v0.1"}
        </p>
      </div>
    </aside>
  );
};
