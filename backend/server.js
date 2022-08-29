import express from "express";
import cors from "cors";
const app = express();
import { corsOptions } from "./config/corsConfig.js";
import { setupMongoDB } from "./config/mongoConfig.js";
import dotenv from "dotenv";
import register from "./routes/register.js";
import login from "./routes/login.js";
import refreshToken from "./routes/refreshToken.js";
import { credentials } from "./middlewares/credentials.js";
import cookieParser from "cookie-parser";
dotenv.config();

setupMongoDB();
app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.listen(process.env.PORT || 3500, () => console.log("listening"));
app.get("/", (req, res) => res.json("connected"));

app.use(
  "/register",

  register
);
app.use(
  "/login",

  login
);
app.use(
  "/refresh",

  refreshToken
);
