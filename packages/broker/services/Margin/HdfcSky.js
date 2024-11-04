export const getHdfcSkyMargin = async (prisma, userId) => {
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

  if (!latestSession) {
    throw new Error("Session not found");
  }

  const broker = await prisma.broker.findFirst({
    where: {
      name: "HdfcSky",
    },
  });

  const margin = await prisma.margin.findFirst({
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
    `https://developer.hdfcsky.com/oapi/v1/funds/view?api_key=${broker.userKey}&client_id=${latestSession.clientCode}&type=all`,
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

  console.log(data.data);

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
          parseFloat(
            data.data.values.find((val) => val[0] === "Available Margin")[1]
          ) +
          parseFloat(
            data.data.values.find((val) => val[0] === "Margin Used")[1]
          ),
        AvailableMargin: parseFloat(
          data.data.values.find((val) => val[0] === "Available Margin")[1]
        ),
        UtilizedMargin: parseFloat(
          data.data.values.find((val) => val[0] === "Margin Used")[1]
        ),
        DPFreeStockValue: parseFloat(
          data.data.values.find((val) => val[0] === "Pledge Benefit")[1]
        ),
      },
    });

    return res;
  }
};
