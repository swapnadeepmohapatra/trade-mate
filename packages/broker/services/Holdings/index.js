import { get5PaisaHoldings } from "./5Paisa.js";
import { getAngelOneHoldings } from "./AngelOne.js";
import { getHdfcSkyHoldings } from "./HdfcSky.js";

export const getStockHoldings = async (prisma, provider, userId) => {
  if (provider === "5Paisa") {
    return await get5PaisaHoldings(prisma, userId);
  }

  if (provider === "AngelOne") {
    return await getAngelOneHoldings(prisma, userId);
  }

  if (provider === "HdfcSky") {
    return await getHdfcSkyHoldings(prisma, userId);
  }

  throw new Error("Provider not found");
};
