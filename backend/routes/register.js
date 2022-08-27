import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { registerUser } from "../controllers/registerController";
import { validateUser } from "../validations/authValidation.js";
import { userSchema } from "../validations/authValidation";

router.post("/", validateUser(userSchema), registerUser);

export default router;
