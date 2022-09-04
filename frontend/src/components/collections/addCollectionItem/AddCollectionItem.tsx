import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import useAddCollectionItem from "./useAddCollectionItem";

const AddCollectionItem = () => {
  const { register, handleSubmit, errors, submitItem, addItemError } =
    useAddCollectionItem();
  return (
    <Container className="mx-auto mt-5 " fluid="sm">
      <Form onSubmit={handleSubmit(submitItem)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="Enter item's name..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            {...register("description")}
            type="text"
            placeholder="Enter item's description..."
          />
        </Form.Group>
        {
          // create additional field
        }

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {addItemError && <Alert variant="danger">{addItemError}</Alert>}
      </Form>
    </Container>
  );
};

export default AddCollectionItem;
