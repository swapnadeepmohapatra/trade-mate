export const get5PaisaMargin = async (prisma, userId) => {
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

  if (!latestSession) {
    throw new Error("Session not found");
  }

  const broker = await prisma.broker.findFirst({
    where: {
      name: "5Paisa",
    },
  });

  const margin = await prisma.margin.findFirst({
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

  if (margin) {
    const margins = await prisma.margin.findMany({
      where: {
        userId,
        broker: {
          name: "5Paisa",
        },
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
    "https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V4/Margin",
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

  if (data.body.EquityMargin) {
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
          parseFloat(data.body.EquityMargin[0].MarginUtilized) +
          parseFloat(data.body.EquityMargin[0].NetAvailableMargin),
        AvailableMargin: parseFloat(
          data.body.EquityMargin[0].NetAvailableMargin
        ),
        UtilizedMargin: parseFloat(data.body.EquityMargin[0].MarginUtilized),
        DPFreeStockValue: parseFloat(
          data.body.EquityMargin[0].DPFreeStockValue
        ),
      },
    });

    return res;
  }
};
