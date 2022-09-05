import { Form, Button } from "react-bootstrap";
import { FormErrors } from "../../../../../formErrors/FormErrors";
import { useAddNewCommentForm } from "./useAddNewCommentForm";

const AddNewCommentForm = () => {
  const { register, handleSubmit, submitComment, errors, addCommentError } =
    useAddNewCommentForm();
  return (
    <Form onSubmit={handleSubmit(submitComment)}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>add new comment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter comment"
          {...register("commentText")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        add comment
      </Button>
      <FormErrors errors={errors} fetchError={addCommentError} />
    </Form>
  );
};

export { AddNewCommentForm };
