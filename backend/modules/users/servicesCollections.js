import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v1 } from "uuid";
async function getCollection(req, res) {
  let isUserOwner;
  const jwt = req.cookies.jwt;
  if (!jwt) isUserOwner = false;
  console.log(jwt);
  try {
    const users = await prisma.user.findMany({});
    const requestCollectionId = req.params.id;
    for (const { collections, refreshToken } of users) {
      for (const collection of collections) {
        if (collection.id === requestCollectionId) {
          console.log(refreshToken);
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
  console.log(newCollectionData, jwt, "data");
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
  console.log(req.body);
}
async function addNewCollectionItem(req, res) {}
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
export {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
  getUserCollections,
};
