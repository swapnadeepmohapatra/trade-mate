import { get5PaisaMargin } from "./5Paisa.js";

export const getMarginForProvider = async (prisma, provider, userId) => {
  if (provider === "5Paisa") {
    return await get5PaisaMargin(prisma, userId);
  }

  //   if (provider === "AngelOne") {
  //     return await getAngelOneMargin(prisma, userId);
  //   }

  //   if (provider === "HdfcSky") {
  //     return await getHdfcSkyMargin(prisma, userId);
  //   }

  //   if (provider === "Upstox") {
  //     return await getUpstoxMargin(prisma, userId);
  //   }

  throw new Error("Provider not found");
};
