export const getBrokerList = async (prisma, userId) => {
  const latestSessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    distinct: ["brokerId"],
    select: {
      brokerId: true,
      broker: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      createdAt: true,
    },
  });

  const brokers = await prisma.broker.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  const brokerList = brokers.map((broker) => {
    const session = latestSessions.find((s) => s.brokerId === broker.id);
    return {
      ...broker,
      createdAt: session ? session.createdAt : null,
    };
  });

  return brokerList;
};
