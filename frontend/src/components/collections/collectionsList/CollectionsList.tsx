import { Loading } from "../../loading/Loading";
import { useCollectionsList } from "./useCollectionsList";
import { CollectionCard } from "../collectionCard/CollectionCard";
const CollectionsList = () => {
  const { collections, isHomePage } = useCollectionsList();
  if (!collections) return <Loading />;
  return (
    <>
      {isHomePage && <h2>Top 5 biggest collections</h2>}
      {collections.map(({ name, description, topic, id }) => (
        <CollectionCard
          key={id}
          name={name}
          description={description}
          topic={topic}
          id={id}
        />
      ))}
    </>
  );
};

export { CollectionsList };
