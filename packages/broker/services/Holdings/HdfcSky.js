import fetch from "node-fetch";

export const getHdfcSkyHoldings = async (prisma, userId) => {
  const latestSession = await prisma.session.findFirst({
    where: {
      userId,
      broker: {
        name: "HdfcSky",
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
        name: "HdfcSky",
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
      name: "HdfcSky",
    },
  });

  const response = await fetch(
    `https://developer.hdfcsky.com/oapi/v1/holdings?api_key=${broker.userKey}&client_id=${latestSession.clientCode}`,
    {
      method: "GET",
      headers: {
        Authorization: `${latestSession.accessToken}`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    }
  );

  const data = await response.json();

  if (data.status === "success") {
    await prisma.holding.deleteMany({
      where: {
        userId,
        broker: {
          name: "HdfcSky",
        },
      },
    });

    await prisma.holding.createMany({
      data: data.data.holdings.map((holding) => ({
        userId,
        brokerId: broker.id,
        AvgRate: holding.buy_avg,
        BseCode: holding.instrument_details.instrument_token,
        CurrentPrice: holding.ltp,
        DPQty: holding.net_holding_quantity,
        Exch: holding.exchange,
        ExchType: holding.exchange,
        FullName: holding.instrument_details.trading_symbol,
        NseCode: holding.instrument_details.instrument_token,
        POASigned: holding.squared_off_free_quantity > 0 ? "Y" : "N",
        PoolQty: holding.squared_off_pledge_quantity,
        Quantity: holding.net_holding_quantity,
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

    return res;
  }

  return data.data.holdings;
};
