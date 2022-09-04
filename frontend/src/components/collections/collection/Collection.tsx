import { useCollections } from "../../../Context/CollectionsProvider";
import { useCollection } from "./useCollection";
import { CollectionItem } from "./collectionItem/CollectionItem";
import { Loading } from "../../loading/Loading";
import { AddCollectionItem } from "./addCollectionItem/AddCollectionItem";
const Collection = () => {
  const { requestedCollection, isUserOwner } = useCollection();
  if (!requestedCollection) return <Loading />;
  alert("hi");
  const { name, description, topic, id, items, ...additionalFields } =
    requestedCollection;
  return (
    <>
      <h1>{name}</h1>
      <h2>{topic}</h2>
      <p>{description}</p>
      {isUserOwner && (
        <AddCollectionItem id={id} additionalFields={additionalFields} />
      )}
      {items.map((item) => (
        <CollectionItem item={item} isUserOwner />
      ))}
    </>
  );
};

export { Collection };
