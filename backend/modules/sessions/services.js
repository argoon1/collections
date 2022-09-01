import { User } from "../../models/User.model.js";
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

export { handleRefreshToken, loginUser };
