import fetch from "node-fetch";

export const getAngelOneHoldings = async (prisma, userId) => {
  const latestSession = await prisma.session.findFirst({
    where: {
      userId,
      broker: {
        name: "AngelOne",
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
        name: "AngelOne",
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
      name: "AngelOne",
    },
  });

  const response = await fetch(
    "https://apiconnect.angelone.in/rest/secure/angelbroking/portfolio/v1/getHolding",
    {
      method: "GET",
      headers: {
        "X-PrivateKey": broker.userKey,
        "X-UserType": "USER",
        "X-SourceID": "WEB",
        "X-ClientLocalIP": "",
        "X-ClientPublicIP": "",
        "X-MACAddress": "",
        "Content-Type": "application/json",
        Authorization: `Bearer ${latestSession.accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (data.message === "SUCCESS") {
    await prisma.holding.deleteMany({
      where: {
        userId,
        broker: {
          name: "AngelOne",
        },
      },
    });

    await prisma.holding.createMany({
      data: data.data.map((holding) => ({
        userId,
        brokerId: broker.id,
        AvgRate: holding.averageprice,
        BseCode: parseInt(holding.symboltoken),
        CurrentPrice: holding.ltp,
        DPQty: holding.haircut,
        Exch: holding.exchange,
        ExchType: holding.exchange,
        FullName: holding.tradingsymbol,
        NseCode: parseInt(holding.symboltoken),
        POASigned: holding.authorisedquantity > 0 ? "Y" : "N",
        PoolQty: holding.authorisedquantity,
        Quantity: holding.quantity,
        ScripMultiplier: 0,
        Symbol: holding.tradingsymbol,
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

  return data.data;
};
