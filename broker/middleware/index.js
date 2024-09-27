import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaMiddleware = async (req, res, next) => {
  req.prisma = prisma;
  next();
};

export const authMiddleware = async (req, res, next) => {
  if (req.headers?.user) {
    req.user = JSON.parse(req.headers.user);
  }
  next();
};
