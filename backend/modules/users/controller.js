import { registerUser, getUsers } from "./services.js";
import express from "express";
const router = express.Router();
import { validateSchema } from "../../middlewares/schemaValidation.js";
import { userSchema } from "../../validations/authValidation.js";
import {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
} from "./servicesCollections.js";
router.get("/", getUsers);

router.post("/register", validateSchema(userSchema), registerUser);
router.get("/collections/getone/:id", getCollection);
router.get("/collections/all", getAllCollections);
router.post("/collections/create", createNewCollection);
router.post("/collections/additem", addNewCollectionItem);

export { router as usersRouter };
