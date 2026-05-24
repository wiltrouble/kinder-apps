"use client";

import { Loader2, LogOut } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

interface LogoutButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  showLabel?: boolean;
  label?: string;
  loadingLabel?: string;
  onAfterLogout?: () => void;
}

export const LogoutButton = ({
  showLabel = true,
  label = "Sign out",
  loadingLabel = "Signing out...",
  onAfterLogout,
  variant = "ghost",
  size = "default",
  className,
  ...buttonProps
}: LogoutButtonProps) => {
  const { logout, isLoggingOut } = useLogout({ onSuccess: onAfterLogout });

  const Icon = isLoggingOut ? Loader2 : LogOut;

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={logout}
      disabled={isLoggingOut || buttonProps.disabled}
      aria-label={showLabel ? undefined : label}
      className={cn(className)}
      {...buttonProps}
    >
      <Icon
        className={cn("size-4", isLoggingOut && "animate-spin")}
        aria-hidden
      />
      {showLabel ? (isLoggingOut ? loadingLabel : label) : null}
    </Button>
  );
};
