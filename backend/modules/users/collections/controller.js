import express from "express";
const router = express.Router();
import {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
  getUserCollections,
  likeCollectionItem,
} from "./servicesCollections.js";

router.get("/collections/collection/:id", getCollection);
router.get("/collections/all", getAllCollections);
router.get("/collections/usercollections", getUserCollections);
router.post("/collections/add", createNewCollection);
router.post("/collections/collection/additem/:id", addNewCollectionItem);
router.post("/collections/like/:id", likeCollectionItem);

export { router as colectionsRouter };
