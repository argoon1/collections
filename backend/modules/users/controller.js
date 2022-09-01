import { registerUser } from "../services";
import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/registerController.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { userSchema } from "../validations/authValidation.js";

router.post("/users", validateSchema(userSchema), registerUser);

export { router as authRouter };
