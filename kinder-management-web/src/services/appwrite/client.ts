import { Account, Client, Databases } from "appwrite";

import { env } from "@/constants/env";

const client = new Client()
  .setEndpoint(env.appwriteEndpoint)
  .setProject(env.appwriteProjectId);

export const appwriteClient = client;
export const account = new Account(client);
export const databases = new Databases(client);
