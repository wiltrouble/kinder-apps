import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface FullPageLoaderProps {
  message?: string;
  className?: string;
}

export const FullPageLoader = ({
  message = "Loading...",
  className,
}: FullPageLoaderProps) => {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-background text-muted-foreground",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" aria-hidden />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
