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

  const holdings = await prisma.holdings.findFirst({
    where: {
      userId,
      broker: {
        name: "5Paisa",
      },
    },
  });

  if (holdings) {
    const data = await prisma.holding.findMany({
      where: {
        id: {
          in: holdings.holdingIds,
        },
      },
    });

    return data;
  }

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

  if (data.body.Message === "Success") {
    await prisma.holding.deleteMany({
      where: {
        userId,
        broker: {
          name: "5Paisa",
        },
      },
    });

    await prisma.holding.createMany({
      data: data.body.Data.map((holding) => ({
        userId,
        brokerId: broker.id,
        ...holding,
      })),
    });

    const res = await prisma.holding.findMany({
      where: {
        userId,
        brokerId: broker.id,
      },
    });

    await prisma.holdings.create({
      data: {
        userId,
        brokerId: broker.id,
        holdings: {
          connect: res.map((holding) => ({ id: holding.id })),
        },
      },
    });
  }

  return data.body.Data;
};
