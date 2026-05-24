"use client";

import { useState } from "react";
import {
  ChevronDown,
  Loader2,
  LogOut,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  showName?: boolean;
}

const getInitials = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
};

export const UserDropdown = ({ showName = true }: UserDropdownProps) => {
  const { user, role } = useAuth();
  const [open, setOpen] = useState(false);
  const { logout, isLoggingOut } = useLogout({
    onSuccess: () => setOpen(false),
  });

  if (!user) {
    return null;
  }

  const displayName = user.name || user.email;
  const initials = getInitials(displayName);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="default"
            className="h-10 gap-2 rounded-full pl-1 pr-2.5"
            aria-label="Open user menu"
          >
            <Avatar size="sm" className="size-8">
              <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            {showName ? (
              <span className="hidden text-left sm:flex sm:flex-col sm:leading-tight">
                <span className="text-sm font-medium">{displayName}</span>
                <span className="text-xs text-muted-foreground">
                  {role?.name ?? "No role"}
                </span>
              </span>
            ) : null}
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
              aria-hidden
            />
          </Button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="truncate text-sm font-medium">{displayName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <ShieldCheck className="size-3" aria-hidden />
              {role?.name ?? "No role assigned"}
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
          onClick={logout}
          disabled={isLoggingOut}
          variant="destructive"
          closeOnClick={false}
        >
          {isLoggingOut ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <LogOut className="size-4" aria-hidden />
          )}
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
