import { Item } from "../../../../../sharedTypes/collectionSharedTypes";
import { Card } from "react-bootstrap";
import { CollectionItemLikes } from "../collectionLikes/CollectionItemLikes";
import { CollectionItemDetails } from "../collectionItemDetails/CollectionItemDetails";

type CollectionItemProps = {
  isUserOwner: boolean;
  item: Item;
  getItemData?: () => Promise<void>;
  showDetails?: boolean;
};
const CollectionItem = ({
  isUserOwner,
  item,
  showDetails,
  getItemData,
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
      <CollectionItemLikes likes={likes} itemId={id} />

      <Card.Link href={`/collections/collection/item/${id}`}>
        Card Link
      </Card.Link>
      {isUserOwner && "enable edit"}
    </Card>
  );
};

export { CollectionItem };
