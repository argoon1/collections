import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useAddCollectionItem } from "./useAddCollectionItem";
import styles from "./addCollectionItem.module.css";
const AddCollectionItem = () => {
  const { register, handleSubmit, errors, submitItem, addItemError } =
    useAddCollectionItem();
  return (
    <Container
      className={`mx-auto mt-5 ${styles.addCollectionItemForm}`}
      fluid="sm"
    >
      asdasdasdas
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

        <Button variant="primary" type="submit" className="w-100">
          Add item
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
