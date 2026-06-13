"use client";

import { Menu } from "lucide-react";

import { BrandMark } from "@/components/shared/BrandMark";
import { UserDropdown } from "@/components/shared/userDropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppNavbarProps {
  onOpenMobileSidebar?: () => void;
  className?: string;
}

export const AppNavbar = ({
  onOpenMobileSidebar,
  className,
}: AppNavbarProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="flex items-center gap-2 lg:hidden">
        {onOpenMobileSidebar ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onOpenMobileSidebar}
            aria-label="Open navigation"
          >
            <Menu className="size-4" aria-hidden />
          </Button>
        ) : null}
        <BrandMark showName={false} />
      </div>

      <div className="hidden lg:block">
        <h1 className="text-sm font-medium text-muted-foreground">
          Welcome to your workspace
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <UserDropdown />
      </div>
    </header>
  );
};
