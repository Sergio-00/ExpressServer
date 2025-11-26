import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};
