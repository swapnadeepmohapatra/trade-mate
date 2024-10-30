import { getAccessTokenFor5Paisa } from "./5Paisa.js";
import { getAccessTokenForAngelOne } from "./AngelOne.js";

export const getAccessTokenForProvider = async (
  prisma,
  provider,
  RequestToken,
  State
) => {
  if (provider === "5Paisa") {
    return await getAccessTokenFor5Paisa(prisma, RequestToken, State);
  }

  if (provider === "AngelOne") {
    return await getAccessTokenForAngelOne(prisma, RequestToken, State);
  }

  throw new Error("Provider not found");
};
