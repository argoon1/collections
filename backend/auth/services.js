import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);
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
    user.refreshToken = refreshToken;
    await user.save();
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
export { loginUser };

import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
async function userAlreadyExists(email) {
  return await User.findOne({ email });
}
async function registerUser(req, res) {
  const { email, password } = req.body;
  const userExists = await userAlreadyExists(email);
  if (userExists) return res.status(409);
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashPassword,
      roles: ["user"],
    });

    res.status(201).json({ message: "user has been created" });
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
}
export { registerUser };

import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403); //Forbidden
  const { email, password, roles } = user;
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

export { handleRefreshToken };
