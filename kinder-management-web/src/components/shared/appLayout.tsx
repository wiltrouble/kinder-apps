"use client";

import { useCallback, useState, type ReactNode } from "react";

import { AppNavbar } from "@/components/shared/appNavbar";
import { AppSidebar } from "@/components/shared/appSidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AppLayoutProps {
  children: ReactNode;
}

const COLLAPSED_STORAGE_KEY = "kinder:sidebar:collapsed";

const readInitialCollapsed = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const persistCollapsed = (value: boolean) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COLLAPSED_STORAGE_KEY, value ? "1" : "0");
  } catch {
    // ignore storage errors
  }
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(() =>
    readInitialCollapsed(),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      persistCollapsed(next);
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <div className="hidden lg:flex">
        <AppSidebar
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
        />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-72 max-w-[80vw] border-r bg-sidebar p-0 text-sidebar-foreground"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Primary application navigation</SheetDescription>
          </SheetHeader>
          <AppSidebar
            showCollapseControl={false}
            onNavigate={closeMobile}
            className="w-full border-r-0"
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppNavbar onOpenMobileSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};
