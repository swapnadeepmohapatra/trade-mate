import { getOAuthLinkFor5Paisa } from "./5Paisa.js";
import { getOAuthLinkForAngelOne } from "./AngelOne.js";
import { getOAuthLinkForHfdcSky } from "./HdfcSky.js";
import { getOAuthLinkForUpstox } from "./Upstox.js";

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

  if (provider === "HdfcSky") {
    return await getOAuthLinkForHfdcSky(prisma, redirect, userId);
  }

  if (provider === "Upstox") {
    return await getOAuthLinkForUpstox(prisma, redirect, userId);
  }

  throw new Error("Provider not found");
};
