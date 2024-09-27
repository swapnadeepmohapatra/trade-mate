import { getOAuthLinkFor5Paisa } from "./5Paisa.js";

export const getOAuthLinkForProvider = async (
  prisma,
  provider,
  redirect,
  userId
) => {
  if (provider === "5Paisa") {
    return await getOAuthLinkFor5Paisa(prisma, redirect, userId);
  }

  throw new Error("Provider not found");
};
