import { Form } from "react-bootstrap";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { CollectionData } from "../useAddCollectionForm";
import { additionalFieldsNames } from "../useAddCollectionForm";
export interface MyProps {
  register: UseFormRegister<FieldValues & CollectionData>;
}
const AddCollectionFormOptionalFields = ({ register }: MyProps) => {
  console.log(register);
  return (
    <>
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
