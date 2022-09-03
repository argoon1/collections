import React from "react";
import { Button } from "react-bootstrap";
import useAddCollectionItem from "./useAddCollectionItem";
import { AdditionalFieldsCollection } from "../../../../Context/CollectionsProvider";
type AddCollectionItemProps = {
  id: string;
  additionalFields: AdditionalFieldsCollection;
};
const AddCollectionItem = ({
  id,
  additionalFields,
}: AddCollectionItemProps) => {
  const { addItem } = useAddCollectionItem();
  return <Button onClick={addItem} />;
};

export { AddCollectionItem };
