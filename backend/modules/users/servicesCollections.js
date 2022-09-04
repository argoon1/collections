import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v1 } from "uuid";

async function getCollection(req, res) {
  let isUserOwner;
  const jwt = req.cookies.jwt;
  if (!jwt) isUserOwner = false;
  try {
    const users = await prisma.user.findMany({});
    const requestCollectionId = req.params.id;
    for (const { collections, refreshToken } of users) {
      for (const collection of collections) {
        if (collection.id === requestCollectionId) {
          return res
            .status(200)
            .json({ collection, isUserOwner: refreshToken === jwt });
        }
      }
    }

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
async function getAllCollections(req, res) {
  res.json({ collections: "TEST DATA COLLECTIONS" });
}
async function createNewCollection(req, res) {
  const jwt = req.cookies.jwt;
  if (!jwt) return res.sendStatus(403);
  const newCollectionData = req.body;
  const { collections } = await prisma.user.findFirst({
    where: {
      refreshToken: jwt,
    },
  });
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
}
async function addNewCollectionItem(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const newItem = req.body;
    const collectionId = req.params.id;
    if (!jwt) return res.sendStatus(403);
    const { collections } = await prisma.user.findFirst({
      where: {
        refreshToken: jwt,
      },
    });
    const requestedCollection = collections.find(
      (collection) => collection.id === collectionId
    );
    const updatedCollections = [
      ...collections.filter((collection) => collection.id !== collectionId),
      {
        ...requestedCollection,
        items: [
          ...requestedCollection.items,
          { ...newItem, id: v1(), likes: 0 },
        ],
      },
    ];
    if (!requestedCollection) return res.sendStatus(404);
    await prisma.user.updateMany({
      where: {
        refreshToken: jwt,
      },
      data: {
        collections: updatedCollections,
      },
    });
  } catch (e) {}
}
async function getUserCollections(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const { collections } = await prisma.user.findFirst({
      where: {
        refreshToken: jwt,
      },
    });
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
    const { likedItems } = await prisma.user.findFirst({
      where: {
        refreshToken: jwt,
      },
    });
    const users = await prisma.user.findMany({});
    const { id: requestedItemOwnerId, collections } = users.find(
      ({ collections }) =>
        collections.some((collection) =>
          collection.items.some((item) => item.id === itemId)
        )
    );
    const itemAlreadyLiked = likedItems.includes(itemId);
    const newLikedItems = itemAlreadyLiked
      ? likedItems.filter((id) => id !== itemId)
      : [...likedItems, itemId];
    const collectionWithLikedItem = collections.find((collection) =>
      collection.items.some((item) => item.id === itemId)
    );
    console.log(1 + (true ? -1 : 1));
    const updateItems = collectionWithLikedItem.items.map((item) => {
      if (item.id !== itemId) return item;
      return { ...item, likes: item.likes + (itemAlreadyLiked ? -1 : 1) };
    });
    const updatedCollectionWithLike = {
      ...collectionWithLikedItem,
      items: updateItems,
    };
    const removeLikedCollectionCollections = collections.filter((collection) =>
      collection.items.every((item) => item.id !== itemId)
    );
    console.log(likedItems);
    console.log("test");
    console.log(newLikedItems);
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
    console.log(newLikedItems);
    await prisma.user.updateMany({
      where: {
        refreshToken: jwt,
      },
      data: {
        likedItems: newLikedItems,
      },
    });

    res.status(204);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
export {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
  getUserCollections,
  likeCollectionItem,
};
