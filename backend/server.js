import express from "express";
import cors from "cors";
const app = express();
import { corsOptions } from "./config/corsConfig.js";
import dotenv from "dotenv";
import { credentials } from "./middlewares/credentials.js";
import cookieParser from "cookie-parser";
import { sessionsRouter } from "./modules/sessions/controller.js";
import { usersRouter } from "./modules/users/controller.js";
import { colectionsRouter } from "./modules/users/collections/controller.js";
dotenv.config();

app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.listen(process.env.PORT || 3500, () => console.log("listening"));
app.get("/", (req, res) => res.json("connected"));

app.use("/users", usersRouter);
app.use("/users/collections/", colectionsRouter);
app.use("/sessions", sessionsRouter);
