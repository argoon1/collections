import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { AUTH_URL } from "../../consts";
import { useState } from "react";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});
const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function submitLogin(data: any) {}

  return {
    register,
    handleSubmit,
    errors,
    submitLogin,
    loginError,
  };
};

export default useLogin;
