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
function getIsUserItemOwner(jwt, users, itemId) {
  for (const { collections, refreshToken } of users) {
    for (const { items } of collections) {
      if (items.some((item) => item.id === itemId)) {
        return jwt && jwt === refreshToken;
      }
    }
  }
}
function getRequestedCollection(jwt, requestCollectionId, users) {
  for (const { collections, refreshToken } of users) {
    for (const collection of collections) {
      if (collection.id === requestCollectionId) {
        return [collection, jwt && refreshToken === jwt];
      }
    }
  }
}

function getCollectionWithNewItem(
  collections,
  newItem,
  collectionId,
  requestedCollection
) {
  return [
    ...collections.filter((collection) => collection.id !== collectionId),
    {
      ...requestedCollection,
      items: [
        ...requestedCollection.items,
        { ...newItem, id: v1(), likes: 0, comments: [] },
      ],
    },
  ];
}

function getItemOwner(users, itemId) {
  return users.find(({ collections }) =>
    collections.some((collection) =>
      collection.items.some((item) => item.id === itemId)
    )
  );
}
function getNewLikedItems(itemAlreadyLiked, likedItems, itemId) {
  return itemAlreadyLiked
    ? likedItems.filter((id) => id !== itemId)
    : [...likedItems, itemId];
}
function getCollectionWithItem(collections, itemId) {
  return collections.find((collection) =>
    collection.items.some((item) => item.id === itemId)
  );
}
function getCollectionWithUpdatedItem(collection, itemId, field, update) {
  const updateItems = collection.items.map((item) => {
    if (item.id !== itemId) return item;
    return { ...item, [field]: update(item[field]) };
  });
  return {
    ...collection,
    items: updateItems,
  };
}
function getRequestedCollectionItem(id, users) {
  return users
    .flatMap(({ collections }) => collections)
    .flatMap(({ items }) => items)
    .find((item) => item.id === id);
}
function getLargestCollectionsList(users) {
  return users
    .map(({ collections }) => collections)
    .flatMap((collections) => collections)
    .sort((itemsA, itemsB) => itemsB.length - itemsA.length)
    .slice(0, 5);
}

async function updateLoggedUser(jwt, field, newData) {
  return prisma.user.updateMany({
    where: {
      refreshToken: jwt,
    },
    data: {
      [field]: newData,
    },
  });
}
async function updateUserById(id, field, newData) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      [field]: newData,
    },
  });
}
export {
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
  updateLoggedUser,
  updateUserById,
};
