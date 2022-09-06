import { Container, Form, Button } from "react-bootstrap";
import { useAddCollectionForm } from "./useAddCollectionForm";
import { AddCollectionFormOptionalFields } from "./addCollectionFormOptionalFields/AddCollectionFormOptionalFields";
import { AddCollectionFormRequiredFields } from "./addCollectionFormRequiredFields/AddCollectionFormRequiredFields";
import { FormErrors } from "../../formErrors/FormErrors";
const AddCollectionForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    submitCollection,
    addCollectionFormError,
  } = useAddCollectionForm();
  return (
    <Container className="mx-auto mt-5 w-25" fluid="sm">
      <Form onSubmit={handleSubmit(submitCollection)}>
        <AddCollectionFormRequiredFields register={register} />
        <AddCollectionFormOptionalFields register={register} />
        <Button variant="primary" type="submit" className="w-100">
          Add collection
        </Button>
        <FormErrors errors={errors} fetchError={addCollectionFormError} />
      </Form>
    </Container>
  );
};

export { AddCollectionForm };
