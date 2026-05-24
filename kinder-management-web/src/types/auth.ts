import type { Models } from "appwrite";

import type { Permission, Role, RoleRow } from "@/types/role";

export type AppwriteAccountUser = Models.User<Models.Preferences>;
export type AppwriteSession = Models.Session;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface UserRow extends Models.Row {
  name?: string;
  email?: string;
  authUserId?: string;
  roleId?: string | RoleRow | null;
}

export interface AuthContext {
  user: AuthUser;
  role: Role | null;
  permissions: Permission[];
}

export const mapAppwriteAccountUser = (
  user: AppwriteAccountUser,
): AuthUser => ({
  id: user.$id,
  email: user.email,
  name: user.name,
  emailVerified: user.emailVerification,
  createdAt: user.$createdAt,
});
