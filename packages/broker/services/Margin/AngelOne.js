export const getAngelOneMargin = async (prisma, userId) => {
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

  if (!latestSession) {
    throw new Error("Session not found");
  }

  const broker = await prisma.broker.findFirst({
    where: {
      name: "AngelOne",
    },
  });

  const margin = await prisma.margin.findFirst({
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
    "https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getRMS",
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
        TotalMargin: parseFloat(data.data.net),
        AvailableMargin: parseFloat(data.data.availablecash),
        UtilizedMargin: parseFloat(data.data.m2mrealized),
        DPFreeStockValue: parseFloat(data.data.utilisedpayout),
      },
    });

    return res;
  }
};
