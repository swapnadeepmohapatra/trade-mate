import fetch from "node-fetch";

export const getAccessTokenForUpstox = async (prisma, RequestToken, State) => {
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
        name: "Upstox",
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
      `https://api.upstox.com/v2/login/authorization/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
        body: new URLSearchParams({
          code: RequestToken,
          client_id: brokerDetails.userKey,
          client_secret: brokerDetails.encryptionKey,
          redirect_uri: "https://trademate.swapnadeep.com/auth/upstox",
          grant_type: "authorization_code",
        }),
      }
    );

    const result = await response.json();

    if (result.status === "error") {
      throw new Error("Token Expired");
    }

    return {
      AccessToken: result.access_token,
      ClientCode: result.user_id,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
