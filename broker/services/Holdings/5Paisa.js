import fetch from "node-fetch";

export const get5PaisaHoldings = async (prisma, userId) => {
  const latestSession = await prisma.session.findFirst({
    where: {
      userId,
      broker: {
        name: "5Paisa",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const broker = await prisma.broker.findFirst({
    where: {
      name: "5Paisa",
    },
  });

  const response = await fetch(
    "https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V3/Holding",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${latestSession.accessToken}`,
      },
      body: JSON.stringify({
        head: {
          key: broker.userKey,
        },
        body: {
          ClientCode: latestSession.clientCode,
        },
      }),
    }
  );

  const data = await response.json();

  return data.body.Data;
};
