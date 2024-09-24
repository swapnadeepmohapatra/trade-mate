import generateJWTTokenAndSetCookie from "../utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const salt = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        salt,
      },
    });

    generateJWTTokenAndSetCookie(newUser.id, salt, res);

    res.status(201).json({ success: true, body: { user: newUser } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    generateJWTTokenAndSetCookie(user.id, user.salt, res);

    res.status(200).json({ success: true, body: { user } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt").status(200).json({ success: true });
};
