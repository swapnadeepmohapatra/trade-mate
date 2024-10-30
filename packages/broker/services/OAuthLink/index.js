import { getOAuthLinkFor5Paisa } from "./5Paisa.js";
import { getOAuthLinkForAngelOne } from "./AngelOne.js";

export const getOAuthLinkForProvider = async (
  prisma,
  provider,
  redirect,
  userId
) => {
  if (provider === "5Paisa") {
    return await getOAuthLinkFor5Paisa(prisma, redirect, userId);
  }

  if (provider === "AngelOne") {
    return await getOAuthLinkForAngelOne(prisma, redirect, userId);
  }

  throw new Error("Provider not found");
};
