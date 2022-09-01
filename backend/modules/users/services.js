import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";

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
