import bcrypt from "bcryptjs";
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
        blocked: false,
        collections: [],
        likedItems: [],
      },
    });
    res.status(201).json({ message: "user has been created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({});
    const toSendUsers = users.map((user) => ({ email: user.email }));
    res.status(200).json({ users: toSendUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export { registerUser, getUsers };
