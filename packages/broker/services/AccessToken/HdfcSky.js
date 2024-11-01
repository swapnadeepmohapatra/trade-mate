import fetch from "node-fetch";

export const getAccessTokenForHdfcSky = async (prisma, RequestToken, State) => {
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
        name: "HdfcSky",
      },
    });

    const { AccessToken } = await makeAccessTokenRequest(
      RequestToken,
      brokerDetails
    );

    const { ClientCode } = await getClientCode(brokerDetails, AccessToken);

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
      `https://developer.hdfcsky.com/oapi/v1/access-token?api_key=${brokerDetails.userKey}&request_token=${RequestToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          apiSecret: brokerDetails.encryptionKey,
        }),
      }
    );

    const result = await response.json();

    if (result.error === "invalid credentials") {
      throw new Error("Token Expired");
    }

    return {
      AccessToken: result.accessToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClientCode = async (brokerDetails, AccessToken) => {
  try {
    const response = await fetch(
      `https://developer.hdfcsky.com/oapi/v1/user/trading_info?api_key=${brokerDetails.userKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Authorization: `${AccessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!result.data.client_id) {
      throw new Error("Access Token Expired");
    }

    return {
      ClientCode: result.data.client_id,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
