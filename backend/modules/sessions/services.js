import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.cookies.jwt);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.sendStatus(401);
  if (user.blocked) return res.sendStatus(401);
  const isCorrectPassword = bcrypt.compare(password, user.password);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        refreshToken,
      },
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, roles: user.roles });
  } else {
    res.sendStatus(401);
  }
}

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });
  if (!user) return res.sendStatus(403);
  const { email, password, roles } = user;
  console.log(roles);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        email,
        password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ roles, accessToken });
  });
};

async function logout(req, res) {
  const refreshToken = req.cookies.jwt;
  await prisma.user.updateMany({
    where: {
      refreshToken,
    },
    data: {
      refreshToken: "",
    },
  });
  res.clearCookie("jwt");

  res.sendStatus(204);
}
export { handleRefreshToken, login, logout };
