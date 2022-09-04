import { Container, Form, Alert, Button } from "react-bootstrap";
import { useAddCollectionForm } from "./useAddCollectionForm";
import { AddCollectionFormOptionalFields } from "./addCollectionFormOptionalFields/AddCollectionFormOptionalFields";
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
        <p>Enter additional fields names seperated by commas</p>
        <p>maximum of three of each kind is allowed.</p>
        <AddCollectionFormOptionalFields register={register} />
        <Button variant="primary" type="submit" className="w-100">
          Add collection
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {addCollectionFormError && (
          <Alert variant={"danger"}>{addCollectionFormError}</Alert>
        )}
      </Form>
    </Container>
  );
};

export { AddCollectionForm };
