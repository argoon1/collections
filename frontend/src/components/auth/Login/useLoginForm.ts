import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import { AuthData } from "../authSharedTypes";
const LOGIN_URL = "/login";

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
  } = useForm<AuthData>({
    resolver: yupResolver(schema),
  });
  async function submitLogin(data: AuthData) {}

  return {
    register,
    handleSubmit,
    errors,
    submitLogin,
    loginError,
  };
};

export default useLogin;
