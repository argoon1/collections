import { useCollection } from "./useCollection";
import { CollectionItem } from "./collectionItem/collectionListItem/CollectionListItem";
import { Loading } from "../../loading/Loading";
import { AddCollectionItem } from "./addCollectionItem/AddCollectionItem";
import { Container } from "react-bootstrap";
import styles from "./collection.module.css";
const Collection = () => {
  const { requestedCollection, isUserOwner, getRequestedCollection } =
    useCollection();
  if (!requestedCollection) return <Loading />;
  const { name, description, topic, id, items, ...additionalFields } =
    requestedCollection;
  return (
    <>
      <header className={styles.collectionItemsHeader}>
        <h1>{name}</h1>
        <h2>{topic}</h2>
        <p>{description}</p>
      </header>
      {isUserOwner && (
        <AddCollectionItem
          id={id}
          additionalFields={additionalFields}
          getRequestedCollection={getRequestedCollection}
        />
      )}
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {items.map((item) => (
          <CollectionItem
            item={item}
            isUserOwner
            getData={getRequestedCollection}
          />
        ))}
      </Container>
    </>
  );
};

export { Collection };
