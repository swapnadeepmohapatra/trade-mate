import { getAccessTokenFor5Paisa } from "./5Paisa.js";

export const getAccessTokenForProvider = async (
  prisma,
  provider,
  RequestToken,
  State
) => {
  if (provider === "5Paisa") {
    return await getAccessTokenFor5Paisa(prisma, RequestToken, State);
  }

  throw new Error("Provider not found");
};
