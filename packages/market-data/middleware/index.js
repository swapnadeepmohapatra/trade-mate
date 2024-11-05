import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export const prismaMiddleware = async (req, res, next) => {
  req.prisma = prisma;
  next();
};

export const authMiddleware = async (req, res, next) => {
  if (req.headers?.cookie) {
    const decoded = decode(req.headers.cookie);
    req.user = decoded;
  }

  if (req.headers?.user) {
    req.user = JSON.parse(req.headers.user);
  }
  next();
};
