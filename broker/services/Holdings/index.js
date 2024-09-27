import { get5PaisaHoldings } from "./5Paisa.js";

export const getStockHoldings = async (prisma, provider, userId) => {
  if (provider === "5Paisa") {
    return await get5PaisaHoldings(prisma, userId);
  }

  throw new Error("Provider not found");
};
