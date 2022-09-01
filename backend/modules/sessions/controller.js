import { handleRefreshToken, login, logout } from "./services.js";
import express from "express";
import { userSchema } from "../../validations/authValidation.js";
import { validateSchema } from "../../middlewares/schemaValidation.js";
const router = express.Router();

router.post("/login", validateSchema(userSchema), login);
router.post("/logout", logout);
router.get(
  "/refresh",

  handleRefreshToken
);
export { router as sessionsRouter };
