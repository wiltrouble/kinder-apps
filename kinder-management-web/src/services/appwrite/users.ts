import { AppwriteException, Query } from "appwrite";

import { env } from "@/constants/env";
import { tablesDb } from "@/services/appwrite/client";
import type { UserRow } from "@/types/auth";
import {
  mapRoleRow,
  type Permission,
  type Role,
  type RoleRow,
} from "@/types/role";

const isNotFound = (error: unknown): boolean =>
  error instanceof AppwriteException &&
  (error.code === 404 ||
    error.type === "document_not_found" ||
    error.type === "row_not_found");

const isExpandedRole = (
  candidate: UserRow["roleId"],
): candidate is RoleRow =>
  typeof candidate === "object" &&
  candidate !== null &&
  "$id" in candidate &&
  "permissions" in candidate;

const ensureDatabaseConfigured = (): boolean => {
  if (!env.appwriteDatabaseId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[users] NEXT_PUBLIC_APPWRITE_DATABASE_ID is not set; skipping users table lookup.",
      );
    }
    return false;
  }
  return true;
};

const fetchRoleById = async (roleId: string): Promise<Role | null> => {
  if (!ensureDatabaseConfigured()) return null;
  try {
    const row = await tablesDb.getRow<RoleRow>({
      databaseId: env.appwriteDatabaseId,
      tableId: env.appwriteRolesTableId,
      rowId: roleId,
    });
    return mapRoleRow(row);
  } catch (error) {
    if (process.env.NODE_ENV !== "production" && !isNotFound(error)) {
      console.warn("[users] fetchRoleById failed", { roleId, error });
    }
    return null;
  }
};

const findUserByAuthField = async (
  authUserId: string,
): Promise<UserRow | null> => {
  try {
    const list = await tablesDb.listRows<UserRow>({
      databaseId: env.appwriteDatabaseId,
      tableId: env.appwriteUsersTableId,
      queries: [
        Query.equal(env.appwriteUsersAuthIdField, authUserId),
        Query.limit(1),
      ],
    });
    return list.rows[0] ?? null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[users] listRows by auth field failed", {
        field: env.appwriteUsersAuthIdField,
        authUserId,
        error,
      });
    }
    return null;
  }
};

const findUserByRowId = async (rowId: string): Promise<UserRow | null> => {
  try {
    return await tablesDb.getRow<UserRow>({
      databaseId: env.appwriteDatabaseId,
      tableId: env.appwriteUsersTableId,
      rowId,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production" && !isNotFound(error)) {
      console.warn("[users] getRow by $id failed", { rowId, error });
    }
    return null;
  }
};

const fetchUserRow = async (authUserId: string): Promise<UserRow | null> => {
  if (!ensureDatabaseConfigured()) return null;
  const byField = await findUserByAuthField(authUserId);
  if (byField) return byField;
  return findUserByRowId(authUserId);
};

const resolveRole = async (
  userRow: UserRow | null,
): Promise<Role | null> => {
  if (!userRow || !userRow.roleId) return null;
  if (isExpandedRole(userRow.roleId)) {
    return mapRoleRow(userRow.roleId);
  }
  if (typeof userRow.roleId === "string") {
    return fetchRoleById(userRow.roleId);
  }
  return null;
};

export interface UserContext {
  row: UserRow | null;
  role: Role | null;
  permissions: Permission[];
}

export const usersService = {
  async getUserRow(authUserId: string): Promise<UserRow | null> {
    return fetchUserRow(authUserId);
  },

  async getRoleById(roleId: string): Promise<Role | null> {
    return fetchRoleById(roleId);
  },

  async fetchUserContext(authUserId: string): Promise<UserContext> {
    const row = await fetchUserRow(authUserId);
    const role = await resolveRole(row);
    return {
      row,
      role,
      permissions: role?.permissions ?? [],
    };
  },
};

export type UsersService = typeof usersService;
