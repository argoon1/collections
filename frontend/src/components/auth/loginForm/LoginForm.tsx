import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLoginForm } from "./useLoginForm";
import { Container } from "react-bootstrap";
import { FormErrors } from "../../formErrors/FormErrors";
import { AuthRequiredFormFields } from "../authRequiredFormFields/AuthRequiredFormFields";
export const LoginForm = () => {
  const { register, handleSubmit, errors, submitLogin, loginError } =
    useLoginForm();

  return (
    <Container className="mx-auto mt-5 " fluid="sm">
      <Form onSubmit={handleSubmit(submitLogin)}>
        <AuthRequiredFormFields register={register} />
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
        <FormErrors errors={errors} fetchError={loginError} />
      </Form>
    </Container>
  );
};
