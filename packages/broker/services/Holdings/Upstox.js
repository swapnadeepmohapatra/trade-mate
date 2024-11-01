import fetch from "node-fetch";

export const getUpstoxHoldings = async (prisma, userId) => {
  const latestSession = await prisma.session.findFirst({
    where: {
      userId,
      broker: {
        name: "Upstox",
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
        name: "Upstox",
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
      name: "Upstox",
    },
  });

  const response = await fetch(
    `https://api.upstox.com/v2/portfolio/long-term-holdings`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${latestSession.accessToken}`,
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  if (data.status === "success") {
    await prisma.holding.deleteMany({
      where: {
        userId,
        broker: {
          name: "Upstox",
        },
      },
    });

    await prisma.holding.createMany({
      data: data.data.map((holding) => ({
        userId,
        brokerId: broker.id,
        AvgRate: holding.average_price,
        BseCode: 0,
        CurrentPrice: holding.last_price,
        DPQty: holding.quantity,
        Exch: holding.exchange,
        ExchType: holding.exchange,
        FullName: holding.company_name,
        NseCode: 0,
        POASigned: holding.haircut > 0 ? "Y" : "N",
        PoolQty: holding.haircut,
        Quantity: holding.quantity,
        ScripMultiplier: 0,
        Symbol: holding.trading_symbol,
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

  return data.data.holdings;
};
