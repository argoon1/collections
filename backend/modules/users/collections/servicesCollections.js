import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v1 } from "uuid";
async function getLoggedUser(jwt) {
  return prisma.user.findFirst({
    where: {
      refreshToken: jwt,
    },
  });
}

function getRequestedCollection(jwt, requestCollectionId, users) {
  for (const { collections, refreshToken } of users) {
    for (const collection of collections) {
      if (collection.id === requestCollectionId) {
        return [collection, refreshToken === jwt];
      }
    }
  }
}
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
async function getAllCollections(req, res) {
  res.json({ collections: "TEST DATA COLLECTIONS" });
}
async function createNewCollection(req, res) {
  try {
    const jwt = req.cookies.jwt;
    const newCollectionData = req.body;
    const { collections } = await getLoggedUser();
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
function getCollectionWithNewItem(collections, newItem) {
  return [
    ...collections.filter((collection) => collection.id !== collectionId),
    {
      ...requestedCollection,
      items: [...requestedCollection.items, { ...newItem, id: v1(), likes: 0 }],
    },
  ];
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
    const updatedCollections = getCollectionWithNewItem(collections, newItem);
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
async function addComment(req, res) {}

function getItemOwner(users, itemId) {
  return users.find(({ collections }) =>
    collections.some((collection) =>
      collection.items.some((item) => item.id === itemId)
    )
  );
}
function getNewLikedItems(itemAlreadyLiked, likedItems, itemId) {
  itemAlreadyLiked
    ? likedItems.filter((id) => id !== itemId)
    : [...likedItems, itemId];
}
function getCollectionWithLikedItem(collections, itemId) {
  return collections.find((collection) =>
    collection.items.some((item) => item.id === itemId)
  );
}
function getUpdatedCollectionWithLike(
  collectionWithLikedItem,
  itemId,
  itemAlreadyLiked
) {
  const updateItems = collectionWithLikedItem.items.map((item) => {
    if (item.id !== itemId) return item;
    return { ...item, likes: item.likes + (itemAlreadyLiked ? -1 : 1) };
  });
  return {
    ...collectionWithLikedItem,
    items: updateItems,
  };
}
async function likeCollectionItem(req, res) {
  const itemId = req.params.id;
  const jwt = req.cookies.jwt;
  if (!jwt) return res.sendStatus(403);
  if (!itemId) return res.sendStatus(404);

  try {
    const { likedItems } = await getLoggedUser(jwt);
    const users = await prisma.user.findMany({});
    const { id: requestedItemOwnerId, collections } = getItemOwner(users, id);
    const itemAlreadyLiked = likedItems.includes(itemId);
    const newLikedItems = getNewLikedItems(
      itemAlreadyLiked,
      likedItems,
      itemId
    );
    const collectionWithLikedItem = getCollectionWithLikedItem(
      collections,
      itemId
    );

    const updatedCollectionWithLike = getUpdatedCollectionWithLike(
      collectionWithLikedItem,
      itemId,
      itemAlreadyLiked
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
