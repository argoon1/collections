import { Loading } from "../../loading/Loading";
import { useUserCollectionsList } from "./useUserCollectionsList";
import { CollectionCard } from "../collectionCard/CollectionCard";
import { useCollections } from "../../../Context/CollectionsProvider";
const UserCollectionsList = () => {
  const { curUserCollections } = useCollections();
  if (!curUserCollections) return <Loading />;
  return (
    <>
      {curUserCollections.map(({ name, description, topic, id }) => (
        <CollectionCard
          name={name}
          description={description}
          topic={topic}
          id={id}
        />
      ))}
    </>
  );
};

export { UserCollectionsList };
