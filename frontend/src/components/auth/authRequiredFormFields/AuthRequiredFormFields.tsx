import React from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { AuthData } from "../authSharedTypes";
interface MyProps {
  register: UseFormRegister<FieldValues & AuthData>;
}
const AuthRequiredFormFields = ({ register }: MyProps) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          {...register("email")}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passowrd">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
    </>
  );
};

export { AuthRequiredFormFields };
