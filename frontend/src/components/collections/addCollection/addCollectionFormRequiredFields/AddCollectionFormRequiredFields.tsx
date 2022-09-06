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
      <Form.Select {...register("topic")}>
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </>
  );
};

export { AddCollectionFormRequiredFields };
