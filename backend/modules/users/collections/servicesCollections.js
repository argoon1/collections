import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v1 } from "uuid";
import {
  getLoggedUser,
  getIsUserItemOwner,
  getRequestedCollection,
  getCollectionWithNewItem,
  getItemOwner,
  getNewLikedItems,
  getCollectionWithItem,
  getRequestedCollectionItem,
  getLargestCollectionsList,
  getCollectionWithUpdatedItem,
} from "./collectionsServicesUtils.js";
async function getCollection(req, res) {
  const jwt = req.cookies.jwt;
  try {
    const users = await prisma.user.findMany({});
    const requestCollectionId = req.params.id;
    const [requestedCollection, isUserOwner] = getRequestedCollection(
      jwt,
      requestCollectionId,
      users
    );

    if (!requestedCollection) {
      return res.sendStatus(404);
    }
    return res
      .status(200)
      .json({ collection: requestedCollection, isUserOwner });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function createNewCollection(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const newCollectionData = req.body;
    const { collections } = await getLoggedUser(jwt);
    await prisma.user.updateMany({
      where: {
        refreshToken: jwt,
      },
      data: {
        collections: [
          ...collections,
          { ...newCollectionData, items: [], id: v1() },
        ],
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function addNewCollectionItem(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const newItem = req.body;
    const collectionId = req.params.id;
    if (!jwt) return res.sendStatus(403);
    const { collections } = await getLoggedUser(jwt);
    const requestedCollection = collections.find(
      (collection) => collection.id === collectionId
    );
    const updatedCollections = getCollectionWithNewItem(
      collections,
      newItem,
      collectionId,
      requestedCollection
    );
    if (!requestedCollection) return res.sendStatus(404);
    await prisma.user.updateMany({
      where: {
        refreshToken: jwt,
      },
      data: {
        collections: updatedCollections,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function getUserCollections(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const { collections } = await getLoggedUser(jwt);
    res.status(200).json({ collections });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function likeCollectionItem(req, res) {
  const itemId = req.params.id;
  const jwt = req.cookies.jwt;
  if (!jwt) return res.sendStatus(403);
  if (!itemId) return res.sendStatus(404);

  try {
    const { likedItems } = await getLoggedUser(jwt);
    const users = await prisma.user.findMany({});
    const { id: requestedItemOwnerId, collections } = getItemOwner(
      users,
      itemId
    );
    const itemAlreadyLiked = likedItems.includes(itemId);
    const newLikedItems = getNewLikedItems(
      itemAlreadyLiked,
      likedItems,
      itemId
    );
    const collectionWithComment = getCollectionWithItem(collections, itemId);

    const updatedCollectionWithLike = getCollectionWithUpdatedItem(
      collectionWithComment,
      itemId,
      "likes",
      (likes) => likes + (itemAlreadyLiked ? -1 : 1)
    );
    const removeLikedCollectionCollections = collections.filter((collection) =>
      collection.items.every((item) => item.id !== itemId)
    );
    await prisma.user.update({
      where: {
        id: requestedItemOwnerId,
      },
      data: {
        collections: [
          ...removeLikedCollectionCollections,
          updatedCollectionWithLike,
        ],
      },
    });
    await prisma.user.updateMany({
      where: {
        refreshToken: jwt,
      },
      data: {
        likedItems: newLikedItems,
      },
    });

    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function getCollectionItem(req, res) {
  try {
    console.log("start");
    const requestedItemId = req.params.id;
    const jwt = req.cookies.jwt;
    const users = await prisma.user.findMany({});
    const requestedItem = getRequestedCollectionItem(requestedItemId, users);

    const isUserOwner = getIsUserItemOwner(jwt, users, requestedItemId);
    console.log(requestedItem);
    if (!requestedItem) return res.sendStatus(404);
    return res.status(200).json({ item: requestedItem, isUserOwner });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
}

async function getLargestCollections(req, res) {
  try {
    const users = await prisma.user.findMany({});

    const largestCollections = getLargestCollectionsList(users);
    res.status(200).json({ collections: largestCollections });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function addComment(req, res) {
  const itemId = req.params.id;
  const jwt = req.cookies.jwt;
  const { commentText } = req.body;
  if (!jwt) return res.sendStatus(403);
  if (!itemId) return res.sendStatus(404);
  try {
    const users = await prisma.user.findMany({});
    const { id: commentedItemOwnerId, collections } = getItemOwner(
      users,
      itemId
    );
    const collectionWithComment = getCollectionWithItem(collections, itemId);
    const updatedCollectionWithComment = getCollectionWithUpdatedItem(
      collectionWithComment,
      itemId,
      "comments",
      (comments) => {
        comments.push(commentText);
        return comments;
      }
    );
    const removedCommentedCollectionCollections = collections.filter(
      (collection) => collection.items.every((item) => item.id !== itemId)
    );
    await prisma.user.update({
      where: {
        id: commentedItemOwnerId,
      },
      data: {
        collections: [
          ...removedCommentedCollectionCollections,
          updatedCollectionWithComment,
        ],
      },
    });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
export {
  getCollection,
  createNewCollection,
  addNewCollectionItem,
  getUserCollections,
  likeCollectionItem,
  getCollectionItem,
  getLargestCollections,
  addComment,
};
