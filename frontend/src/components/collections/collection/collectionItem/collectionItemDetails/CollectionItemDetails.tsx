import { ListGroup } from "react-bootstrap";
import { AdditionalFieldsItem } from "../../../../../sharedTypes/collectionSharedTypes";
import { AddNewCommentForm } from "./addNewCommentForm/AddNewCommentForm";
import styles from "./collectionItemDetails.module.css";
type CollectionItemDetailsProps = {
  itemAdditionalFields: AdditionalFieldsItem;
  comments: string[];
};
const CollectionItemDetails = ({
  itemAdditionalFields,
  comments,
}: CollectionItemDetailsProps) => {
  return (
    <>
      {Object.entries(itemAdditionalFields).map(([key, value], idx) => {
        return <p key={idx}>{`${key}: ${value}`}</p>;
      })}{" "}
      <h3>Comments</h3>
      <ListGroup>
        {comments.map((comment, idx) => (
          <ListGroup.Item key={idx}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <AddNewCommentForm />
    </>
  );
};

export { CollectionItemDetails };
