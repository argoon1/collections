import React from "react";
import { AdditionalFieldsItem } from "../../../../../sharedTypes/collectionSharedTypes";
import { AddNewCommentForm } from "./addNewCommentForm/AddNewCommentForm";
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
      {Object.entries(itemAdditionalFields).flatMap(([key, value]) => {
        if (key === "string" || key === "date") return undefined;
        return Object.entries(value).map(([key, value]) => key + " " + value);
      })}{" "}
      {comments.map((comment) => (
        <p>{comment}</p>
      ))}
      <AddNewCommentForm />
    </>
  );
};

export { CollectionItemDetails };
