import generateJWTTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
  }

  try {
    const user = await req.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = await req.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    generateJWTTokenAndSetCookie(newUser.id, res);

    res.status(201).json({
      success: true,
      body: {
        user: {
          ...newUser,
          password: undefined,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await req.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password || "");

    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: "Invalid Pasword" });
    }

    generateJWTTokenAndSetCookie(user.id, res);

    res.status(200).json({
      success: true,
      body: { user: { ...user, password: undefined } },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt").status(200).json({ success: true });
};

export const getUser = async (req, res) => {
  try {
    const user = await req.prisma.user.findFirst({
      where: {
        id: req.user.userId,
      },
    });

    res.status(200).json({
      success: true,
      body: {
        user: {
          ...user,
          password: undefined,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
