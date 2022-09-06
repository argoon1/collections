import { Loading } from "../../loading/Loading";
import { useCollectionsList } from "./useCollectionsList";
import { CollectionCard } from "../collectionCard/CollectionCard";
import { Container } from "react-bootstrap";
const CollectionsList = () => {
  const { collections, isHomePage } = useCollectionsList();
  if (!collections) return <Loading />;
  return (
    <>
      {isHomePage && <h2> 5 biggest collections</h2>}
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "space-between",
        }}
      >
        {collections.map(({ name, description, topic, id, items }) => (
          <article>
            <h3>{items.length} items</h3>
            <CollectionCard
              key={id}
              name={name}
              description={description}
              topic={topic}
              id={id}
            />
          </article>
        ))}
      </Container>
    </>
  );
};

export { CollectionsList };
