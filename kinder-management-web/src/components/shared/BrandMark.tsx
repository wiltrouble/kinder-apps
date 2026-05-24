import { Sparkles } from "lucide-react";

import { appConfig } from "@/constants/app";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  showName?: boolean;
}

export const BrandMark = ({
  className,
  showName = true,
}: BrandMarkProps) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Sparkles className="size-4" aria-hidden />
      </span>
      {showName ? (
        <span className="font-heading text-base font-semibold tracking-tight">
          {appConfig.name}
        </span>
      ) : null}
    </div>
  );
};
