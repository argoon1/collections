import { Form } from "react-bootstrap";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { additionalFieldsNames } from "../useAddCollectionForm";
import { CollectionData } from "../useAddCollectionForm";
export interface MyProps {
  register: UseFormRegister<FieldValues & CollectionData>;
}
const AddCollectionFormOptionalFields = ({ register }: MyProps) => {
  return (
    <>
      <p>Enter additional fields names seperated by commas</p>
      <p>maximum of three of each kind is allowed.</p>
      {additionalFieldsNames.map((name) => (
        <Form.Group className="mb-3" controlId={name} key={name}>
          <Form.Label>add {name} fields</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter ${name} ...`}
            {...register(name)}
          />
        </Form.Group>
      ))}
    </>
  );
};

export { AddCollectionFormOptionalFields };
