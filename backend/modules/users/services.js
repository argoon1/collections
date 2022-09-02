import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) return res.status(409);
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        refreshToken: "",
        roles: ["user"],
      },
    });
    console.log(email, password);
    res.status(201).json({ message: "user has been created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

export { registerUser };
