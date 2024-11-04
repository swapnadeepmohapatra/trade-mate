export const getUpstoxMargin = async (prisma, userId) => {
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

  if (!latestSession) {
    throw new Error("Session not found");
  }

  const broker = await prisma.broker.findFirst({
    where: {
      name: "Upstox",
    },
  });

  const margin = await prisma.margin.findFirst({
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

  if (margin) {
    const margins = await prisma.margin.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        AvailableMargin: true,
        UtilizedMargin: true,
        TotalMargin: true,
        DPFreeStockValue: true,
        broker: {
          select: {
            name: true,
            imageUrl: true,
            id: true,
          },
        },
      },
    });

    return margins;
  }

  const response = await fetch(
    `https://api.upstox.com/v2/user/get-funds-and-margin`,
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
    const res = await prisma.margin.create({
      data: {
        broker: {
          connect: {
            id: broker.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        TotalMargin:
          parseFloat(data.data.equity.available_margin) +
          parseFloat(data.data.equity.used_margin),
        AvailableMargin: parseFloat(data.data.equity.available_margin),
        UtilizedMargin: parseFloat(data.data.equity.used_margin),
        DPFreeStockValue: parseFloat(data.data.equity.span_margin),
      },
    });

    return res;
  }
};
