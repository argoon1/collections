import express from "express";
const router = express.Router();
import {
  getCollection,
  createNewCollection,
  addNewCollectionItem,
  getUserCollections,
  likeCollectionItem,
  getCollectionItem,
  getLargestCollections,
  addComment,
} from "./servicesCollections.js";

router.get("/collection/:id", getCollection);
router.get("/usercollections", getUserCollections);
router.get("/collection/item/:id", getCollectionItem);
router.get("/largest", getLargestCollections);
router.post("/add", createNewCollection);
router.post("/collection/additem/:id", addNewCollectionItem);
router.post("/comment/:id", addComment);
router.post("/like/:id", likeCollectionItem);

export { router as colectionsRouter };
