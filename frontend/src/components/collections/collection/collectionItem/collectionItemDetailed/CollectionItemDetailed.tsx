import { Card } from "react-bootstrap";
import { CollectionItemLikes } from "../collectionLikes/CollectionItemLikes";
import { CollectionItemDetails } from "../collectionItemDetails/CollectionItemDetails";
import { Loading } from "../../../../loading/Loading";
import { useCollectionItemDetailed } from "./useCollectionItemDetailed";
const CollectionItemDetailed = () => {
  const { itemData, isUserOwner, getItemData } = useCollectionItemDetailed();

  if (!itemData) return <Loading />;
  const { likes, comments, id, name, tags, ...itemAdditionalFields } = itemData;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>tags {tags}</Card.Text>
        <Card.Text>id:{id}</Card.Text>
        {}
      </Card.Body>
      {comments}
      <CollectionItemLikes likes={likes} itemId={id} />

      <CollectionItemDetails
        itemAdditionalFields={itemAdditionalFields}
        comments={comments}
      />
      {isUserOwner && "enable edit"}
    </Card>
  );
};

export { CollectionItemDetailed };
