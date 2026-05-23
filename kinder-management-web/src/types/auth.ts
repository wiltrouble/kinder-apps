import type { Models } from "appwrite";

export type AppwriteUser = Models.User<Models.Preferences>;
export type AppwriteSession = Models.Session;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
}

export const mapAppwriteUser = (user: AppwriteUser): AuthUser => ({
  id: user.$id,
  email: user.email,
  name: user.name,
  emailVerified: user.emailVerification,
  createdAt: user.$createdAt,
});
