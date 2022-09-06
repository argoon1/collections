import { Item } from "../../../../../sharedTypes/collectionSharedTypes";
import { Card } from "react-bootstrap";
import { CollectionItemLikes } from "../collectionLikes/CollectionItemLikes";
import { CollectionItemDetails } from "../collectionItemDetails/CollectionItemDetails";

type CollectionItemProps = {
  isUserOwner: boolean;
  item: Item;
  getData: () => Promise<void>;
};
const CollectionItem = ({
  isUserOwner,
  item,
  getData,
}: CollectionItemProps) => {
  const { likes, comments, id, name, tags } = item;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>tags {tags}</Card.Text>
        <Card.Text>id:{id}</Card.Text>
        {}
      </Card.Body>
      {comments}
      <CollectionItemLikes likes={likes} itemId={id} getData={getData} />

      <Card.Link href={`/collections/collection/item/${id}`}>
        Card Link
      </Card.Link>
      {isUserOwner && (
        <Card.Link href={`/collections/collection/item/edit/${id}`}>
          Card Link
        </Card.Link>
      )}
    </Card>
  );
};

export { CollectionItem };
