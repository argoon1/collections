import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { loginUser } from "../controllers/loginController";
import { validateUser } from "../validations/authValidation.js";
import { userSchema } from "../validations/authValidation";
router.post("/", validateUser(userSchema), registerUser);

module.exports = router;

export default router;
