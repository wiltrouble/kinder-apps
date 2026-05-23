import { BrandMark } from "@/components/shared/BrandMark";
import { UserMenu } from "@/components/shared/UserMenu";

export const TopNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 lg:hidden">
        <BrandMark showName={false} />
      </div>

      <div className="hidden text-sm text-muted-foreground lg:block">
        Welcome to your workspace
      </div>

      <div className="ml-auto flex items-center gap-2">
        <UserMenu />
      </div>
    </header>
  );
};
