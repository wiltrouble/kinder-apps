"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

const getInitials = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
};

export const UserMenu = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    return null;
  }

  const displayName = user.name || user.email;
  const initials = getInitials(displayName);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Signed out");
      router.replace(routes.login);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to sign out";
      toast.error("Sign out failed", { description: message });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="default"
            className="h-9 gap-2 rounded-full pr-3 pl-1"
          >
            <span className="grid size-7 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {initials}
            </span>
            <span className="hidden text-sm font-medium sm:inline">
              {displayName}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="truncate text-sm font-medium">{displayName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserIcon className="size-4" aria-hidden />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="destructive"
        >
          <LogOut className="size-4" aria-hidden />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
