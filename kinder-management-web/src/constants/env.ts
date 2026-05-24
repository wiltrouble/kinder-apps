const requireEnv = (value: string | undefined, key: string): string => {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Add it to your .env.local file.`,
    );
  }
  return trimmed;
};

const optionalEnv = (value: string | undefined, fallback: string): string =>
  value?.trim() || fallback;

const firstDefined = (
  values: Array<string | undefined>,
  fallback: string,
): string => {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return fallback;
};

export const env = {
  appwriteEndpoint: requireEnv(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  ),
  appwriteProjectId: requireEnv(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  ),
  appwriteProjectName: optionalEnv(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME,
    "Kinder",
  ),
  appwriteDatabaseId: optionalEnv(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    "",
  ),
  appwriteUsersTableId: firstDefined(
    [
      process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    ],
    "users",
  ),
  appwriteRolesTableId: firstDefined(
    [
      process.env.NEXT_PUBLIC_APPWRITE_ROLES_TABLE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID,
    ],
    "roles",
  ),
  appwriteUsersAuthIdField: optionalEnv(
    process.env.NEXT_PUBLIC_APPWRITE_USERS_AUTH_ID_FIELD,
    "authUserId",
  ),
} as const;
