import { Alert } from "react-bootstrap";
import { FieldError } from "react-hook-form";
type FormErrorsProps = {
  errors: any;
  fetchError: string;
};

const FormErrors = ({ errors, fetchError }: FormErrorsProps) => {
  return (
    <>
      {Object.values(errors).map((data) => (
        <Alert variant="danger">{(data as any)?.message} </Alert>
      ))}
      {fetchError && <Alert variant={"danger"}>{fetchError}</Alert>}
    </>
  );
};

export { FormErrors };
