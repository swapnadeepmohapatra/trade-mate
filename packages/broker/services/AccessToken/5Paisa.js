import fetch from "node-fetch";

export const getAccessTokenFor5Paisa = async (prisma, RequestToken, State) => {
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
        name: "5Paisa",
      },
    });

    const { AccessToken, ClientCode } = await makeAccessTokenRequest(
      RequestToken,
      brokerDetails
    );

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        accessToken: AccessToken,
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
      `https://Openapi.5paisa.com/VendorsAPI/Service1.svc/GetAccessToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          head: {
            Key: brokerDetails.userKey,
          },
          body: {
            RequestToken: RequestToken,
            EncryKey: brokerDetails.encryptionKey,
            UserId: brokerDetails.userId,
          },
        }),
      }
    );

    const result = await response.json();

    if (result.body.Message === "Token Expired.") {
      throw new Error("Token Expired");
    }

    return {
      AccessToken: result.body.AccessToken,
      ClientCode: result.body.ClientCode,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
