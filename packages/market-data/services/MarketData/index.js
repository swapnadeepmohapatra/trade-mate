export const getMarketDataList = async (prisma, symbol) => {
  const marketData = await prisma.marketData.findMany({
    where: {
      OR: [
        {
          fullName: {
            contains: symbol,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: symbol,
            mode: "insensitive",
          },
        },
        {
          symbolRoot: {
            contains: symbol,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      fullName: true,
      exch: true,
      isin: true,
      symbolRoot: true,
      scripData: true,
    },
  });

  return marketData;
};
