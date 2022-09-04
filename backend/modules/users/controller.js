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
  getUserCollections,
  likeCollectionItem,
} from "./servicesCollections.js";
import {
  deleteUsers,
  blockUsers,
  unblockUsers,
} from "./servicesAdminActions.js";
router.get("/", getUsers);

router.post("/register", validateSchema(userSchema), registerUser);

router.get("/collections/collection/:id", getCollection);
router.get("/collections/all", getAllCollections);
router.get("/collections/usercollections", getUserCollections);
router.post("/collections/add", createNewCollection);
router.post("/collections/collection/additem/:id", addNewCollectionItem);
router.post("/collections/like/:id", likeCollectionItem);

router.post("/delete", deleteUsers);
router.post("/unblock", unblockUsers);
router.post("/block", blockUsers);
export { router as usersRouter };
