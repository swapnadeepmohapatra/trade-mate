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

  if (provider === "Zerodha") {
    return "https://kite.zerodha.com/connect/login?api_key=kitefront&v";
  }

  if (provider === "AliceBlue") {
    return "https://ant.aliceblueonline.com/MFLogin.aspx";
  }

  if (provider === "Groww") {
    return "https://groww.in/login";
  }

  if (provider === "ICICI Direct") {
    return "https://secure.icicidirect.com/customer/login";
  }

  if (provider === "Kotak Securities") {
    return "https://ntrade.kotaksecurities.com/Login";
  }

  if (provider === "Axis Direct") {
    return "https://login.axisdirect.in/";
  }

  if (provider === "PayTMMoney") {
    return "https://login.paytmmoney.com/";
  }

  throw new Error("Provider not found");
};
