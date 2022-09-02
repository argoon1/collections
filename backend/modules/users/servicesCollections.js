async function getCollection(req, res) {}
async function getAllCollections(req, res) {
  res.json({ collections: "TEST DATA COLLECTIONS" });
}
async function createNewCollection(req, res) {}
async function addNewCollectionItem(req, res) {}

export {
  getCollection,
  getAllCollections,
  createNewCollection,
  addNewCollectionItem,
};
