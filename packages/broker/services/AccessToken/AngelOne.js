import fetch from "node-fetch";

export const getAccessTokenForAngelOne = async (
  prisma,
  RequestToken,
  State
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: State,
      },
    });

    if (!user) {
      throw new Error("Invalid State");
    }

    const brokerDetails = await prisma.broker.findFirst({
      where: {
        name: "AngelOne",
      },
    });

    const { ClientCode } = await makeAccessTokenRequest(
      RequestToken,
      brokerDetails
    );

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        accessToken: RequestToken,
        requestToken: RequestToken,
        brokerId: brokerDetails.id,
        clientCode: ClientCode,
      },
    });

    if (!session) {
      throw new Error("Invalid RequestToken or State");
    }

    return ClientCode;
  } catch (error) {
    throw new Error(error.message);
  }
};

const makeAccessTokenRequest = async (RequestToken, brokerDetails) => {
  try {
    const response = await fetch(
      `https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getProfile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-PrivateKey": brokerDetails.userKey,
          "X-UserType": "USER",
          "X-SourceID": "WEB",
          "X-ClientLocalIP": "",
          "X-ClientPublicIP": "",
          "X-MACAddress": "",
          Authorization: `Bearer ${RequestToken}`,
        },
      }
    );

    const result = await response.json();

    if (result.message === "Token Expired.") {
      throw new Error("Token Expired");
    }

    return {
      ClientCode: result.data.clientcode,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
