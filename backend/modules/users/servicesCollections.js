import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function getCollection(req, res) {}
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
  prisma.user.updateMany({
    where: {
      refreshToken: jwt,
    },
    data: {
      collections: [...collections, { newCollectionData, items: [] }],
    },
  });
  console.log(req.body);
}
async function addNewCollectionItem(req, res) {}

export {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
};
