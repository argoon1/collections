import useRegister from "./useRegisterForm";
import { Container, Form, Button } from "react-bootstrap";
import { FormErrors } from "../../formErrors/FormErrors";
import { AuthRequiredFormFields } from "../authRequiredFormFields/AuthRequiredFormFields";
import styles from "./registerForm.module.css";
export const RegisterForm = () => {
  const { registerError, register, handleSubmit, errors, submitRegister } =
    useRegister();
  return (
    <Container
      className={`mx-auto mt-5 w-25 ${styles.registerForm}`}
      fluid="sm"
    >
      <Form onSubmit={handleSubmit(submitRegister)}>
        <AuthRequiredFormFields register={register} />
        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
        <FormErrors errors={errors} fetchError={registerError} />
      </Form>
    </Container>
  );
};
