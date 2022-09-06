import { Form, Container, Button } from "react-bootstrap";
import { Loading } from "../../loading/Loading";
import useUpdateCollectionItem from "./useUpdateCollectionItem";

const UpdateCollectionItem = () => {
  const { itemData, register, handleSubmit, errors, submitItem } =
    useUpdateCollectionItem();
  if (!itemData) return <Loading />;
  const { string, integer, multiline, checkboxes, date } = itemData;
  return (
    <Container className="mx-auto mt-5 " fluid="sm">
      <Form onSubmit={handleSubmit(submitItem)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>{"name"}</Form.Label>
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="enter name..."
          />
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>tags seperated by commas</Form.Label>
            <Form.Control
              {...register("tags")}
              type="text"
              placeholder="enter tags seperated by commas..."
            />
          </Form.Group>
        </Form.Group>
        {/* {string?.map((fieldName) => (
          <Form.Group className="mb-3" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control
              {...register(fieldName as string)}
              type="text"
              placeholder={`enter ${fieldName}`}
              value={"asdasd"}
            />
          </Form.Group>
        ))}
        {integer?.map((fieldName) => (
          <Form.Group className="mb-3" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control
              {...register(fieldName as string)}
              type="number"
              placeholder={`enter ${fieldName}`}
            />
          </Form.Group>
        ))}
        {multiline?.map((fieldName) => (
          <Form.Group className="mb-3" controlId={fieldName}>
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control
              {...register(fieldName as string)}
              type="textarea"
              placeholder={`enter ${fieldName}`}
            />
          </Form.Group>
        ))}
        {checkboxes?.map((fieldName) => (
          <Form.Check
            type="checkbox"
            id={fieldName}
            label={fieldName}
            {...register(fieldName as string)}
          />
        ))}
        {date?.map((fieldName) => fieldName)}
        <Button variant="primary" type="submit" className="w-100">
          add item
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {addItemError && <Alert variant="danger">{addItemError}</Alert>} */}
      </Form>
    </Container>
  );
};

export { UpdateCollectionItem };
