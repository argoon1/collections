import { Item } from "../../../../Context/CollectionsProvider";
import { Card } from "react-bootstrap";
import { CollectionItemLikes } from "./collectionLikes/CollectionItemLikes";
type CollectionItemProps = {
  isUserOwner: boolean;
  item: Item;
};
const CollectionItem = ({ isUserOwner, item }: CollectionItemProps) => {
  const { likes, comments, id, name, tags, ...itemAdditionalFields } = item;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>tags {tags}</Card.Text>
        <Card.Text>id:{id}</Card.Text>
        {Object.entries(itemAdditionalFields).flatMap(([key, value]) => {
          if (key === "string" || key === "date") return undefined;
          return Object.entries(value).map(([key, value]) => key + " " + value);
        })}
      </Card.Body>
      {comments}
      <CollectionItemLikes likes={likes} itemId={id} />
      {isUserOwner && "enable edit"}
    </Card>
  );
};

export { CollectionItem };
