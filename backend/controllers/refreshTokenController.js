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
