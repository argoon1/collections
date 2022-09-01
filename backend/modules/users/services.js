import bcrypt from "bcrypt";
import { User } from "../../models/User.model.js";

async function registerUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(409);
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
