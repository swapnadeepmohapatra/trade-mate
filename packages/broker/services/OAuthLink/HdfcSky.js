export const getOAuthLinkForHfdcSky = async (prisma, redirect, userId) => {
  const brokerDetails = await prisma.broker.findFirst({
    where: {
      name: "HdfcSky",
    },
  });

  if (!brokerDetails) {
    throw new Error("Broker not found");
  }

  const { userKey } = brokerDetails;

  const oAuthLink = `https://developer.hdfcsky.com/oapi/v1/login?api_key=${userKey}&state=${userId}`;

  return oAuthLink;
};
