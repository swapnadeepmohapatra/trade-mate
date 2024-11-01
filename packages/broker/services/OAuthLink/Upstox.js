export const getOAuthLinkForUpstox = async (prisma, redirect, userId) => {
  const brokerDetails = await prisma.broker.findFirst({
    where: {
      name: "Upstox",
    },
  });

  if (!brokerDetails) {
    throw new Error("Broker not found");
  }

  const { userKey } = brokerDetails;

  const redirectUrl = "https://trademate.swapnadeep.me/auth/upstox";

  const oAuthLink = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${userKey}&redirect_uri=${redirectUrl}&state=${userId}`;

  return oAuthLink;
};
