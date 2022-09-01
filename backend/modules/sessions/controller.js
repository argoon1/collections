import { handleRefreshToken, loginUser } from "./services.js";
import express from "express";
import { userSchema } from "../../validations/authValidation.js";
import { validateSchema } from "../../middlewares/schemaValidation.js";
const router = express.Router();

router.post("/", validateSchema(userSchema), loginUser);
router.post("/refresh", validateSchema(userSchema), handleRefreshToken);

export { router as sessionsRouter };
