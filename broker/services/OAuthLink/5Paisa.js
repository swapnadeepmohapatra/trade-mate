export const getOAuthLinkFor5Paisa = async (prisma, redirect, userId) => {
  const brokerDetails = await prisma.broker.findFirst({
    where: {
      name: "5Paisa",
    },
  });

  if (!brokerDetails) {
    throw new Error("Broker not found");
  }

  const { userKey } = brokerDetails;

  const oAuthLink = ` https://dev-openapi.5paisa.com/WebVendorLogin/VLogin/Index?VendorKey=${userKey}&ResponseURL=${redirect}&State=${userId}`;

  return oAuthLink;
};
