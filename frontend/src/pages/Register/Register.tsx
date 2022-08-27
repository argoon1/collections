import React from "react";
import useRegister from "./useRegister";
import { Container, Form, Alert, Button } from "react-bootstrap";
const Register = () => {
  const { errorMessage, register, handleSubmit, errors, submitRegister } =
    useRegister();
  return (
    <Container className="mx-auto mt-5 w-25" fluid="sm">
      <Form onSubmit={handleSubmit(submitRegister)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name ..."
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email ..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password ..."
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
      </Form>
    </Container>
  );
};

export default Register;
