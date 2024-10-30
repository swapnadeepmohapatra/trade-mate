export const getOAuthLinkForAngelOne = async (prisma, redirect, userId) => {
  const brokerDetails = await prisma.broker.findFirst({
    where: {
      name: "AngelOne",
    },
  });

  if (!brokerDetails) {
    throw new Error("Broker not found");
  }

  const { userKey } = brokerDetails;

  const oAuthLink = `https://smartapi.angelone.in/publisher-login?api_key=${userKey}&state=${userId}`;

  return oAuthLink;
};
