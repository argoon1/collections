import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { registerUser } from "../controllers/registerController.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { userSchema } from "../validations/authValidation.js";

router.post("/", validateSchema(userSchema), registerUser);

export default router;
