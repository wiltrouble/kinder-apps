"use client";

import {
  CalendarDays,
  GraduationCap,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/constants/env";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  {
    label: "Active students",
    value: "—",
    helper: "Across all classrooms",
    icon: GraduationCap,
  },
  {
    label: "Classrooms",
    value: "—",
    helper: "Open for the term",
    icon: Users,
  },
  {
    label: "Events this week",
    value: "—",
    helper: "Activities and meetings",
    icon: CalendarDays,
  },
];

export default function DashboardPage() {
  const { user, role, permissions: granted } = useAuth();
  const displayName = user?.name || user?.email || "there";
  const hasRole = Boolean(role);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Dashboard
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back, {displayName}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Here&apos;s a quick snapshot of your kindergarten. Connect your
          modules to see live data, manage classrooms, and keep the team in
          sync.
        </p>
      </section>

      {!hasRole ? (
        <Card className="rounded-2xl border-amber-200/60 bg-amber-50/40 ring-1 ring-amber-200/60 dark:border-amber-500/30 dark:bg-amber-500/5 dark:ring-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-amber-900 dark:text-amber-200">
              <ShieldAlert className="size-4" aria-hidden />
              No role assigned
            </CardTitle>
            <CardDescription className="text-amber-900/80 dark:text-amber-200/80">
              You&apos;re signed in, but no role has been linked to your
              account yet — so permission-gated sections will be hidden.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-amber-900/90 dark:text-amber-200/90">
            Ask an administrator to add a row for your user in the{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs dark:bg-amber-500/20">
              users
            </code>{" "}
            table where{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs dark:bg-amber-500/20">
              {env.appwriteUsersAuthIdField} = {user?.id}
            </code>{" "}
            and{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs dark:bg-amber-500/20">
              roleId
            </code>{" "}
            points to a role in the{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs dark:bg-amber-500/20">
              roles
            </code>{" "}
            table.
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <span className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.helper}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-primary" aria-hidden />
              Getting started
            </CardTitle>
            <CardDescription>
              Plug in your modules to see real-time data here.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              This dashboard is your starting point. Hook up the Students,
              Classrooms, Attendance, and Reports modules to bring it to life.
              Permissions are enforced everywhere — only authorized teammates
              will see each section in the sidebar.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              Signed in
            </CardTitle>
            <CardDescription>You are authenticated.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <UserRound
                className="mt-0.5 size-4 text-muted-foreground"
                aria-hidden
              />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Name
                </span>
                <span className="font-medium">{user?.name ?? "—"}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <Mail
                className="mt-0.5 size-4 text-muted-foreground"
                aria-hidden
              />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </span>
                <span className="font-medium">{user?.email ?? "—"}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <ShieldCheck
                className="mt-0.5 size-4 text-muted-foreground"
                aria-hidden
              />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Role
                </span>
                <span className="font-medium">
                  {role?.name ?? "No role assigned"}
                </span>
                {granted.length ? (
                  <span className="mt-1 text-xs text-muted-foreground">
                    {granted.length} permission
                    {granted.length === 1 ? "" : "s"} granted
                  </span>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
