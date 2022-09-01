import { registerUser } from "./services.js";
import express from "express";
const router = express.Router();
import { validateSchema } from "../../middlewares/schemaValidation.js";
import { userSchema } from "../../validations/authValidation.js";

router.post("/", validateSchema(userSchema), registerUser);

export { router as usersRouter };
