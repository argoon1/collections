import { Form } from "react-bootstrap";
import { CollectionData } from "../useAddCollectionForm";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface MyProps {
  register: UseFormRegister<FieldValues & CollectionData>;
}
const AddCollectionFormRequiredFields = ({ register }: MyProps) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          {...register("name")}
          type="text"
          placeholder="Enter collection name ..."
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="description"
          placeholder="Enter description ..."
          {...register("description")}
        />
      </Form.Group>
    </>
  );
};

export { AddCollectionFormRequiredFields };
