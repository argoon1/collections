import express from "express";
import cors from "cors";
const app = express();
import { corsOptions } from "./config/corsConfig.mjs";
import { setupMongoDB } from "./config/mongoConfig.mjs";
import dotenv from "dotenv";

dotenv.config();

setupMongoDB();
app.use(cors(corsOptions));
app.use(express.json());
app.listen(process.env.PORT || 3500, () => console.log("listening"));
app.get("/", (req, res) => res.json("connected"));
