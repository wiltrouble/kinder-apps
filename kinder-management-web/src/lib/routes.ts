export const routes = {
  home: "/",
  login: "/login",
  unauthorized: "/unauthorized",
  dashboard: "/dashboard",
  users: "/users",
  roles: "/roles",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export const publicRoutes: AppRoute[] = [routes.login, routes.unauthorized];

export const isPublicRoute = (pathname: string): boolean =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
