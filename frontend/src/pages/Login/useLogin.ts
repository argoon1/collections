import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axios } from "../../api/axiosConfig";
import { useState } from "react";
const LOGIN_URL = "/session";
type LoginData = {
  email: string;
  password: string;
};
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
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });
  async function submitLogin(data: LoginData) {
    try {
      await axios.post(LOGIN_URL, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/login");
    } catch (e) {
      if (!e) {
        setLoginError("no server response");
      }
      //handle duplicate/
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    submitLogin,
    loginError,
  };
};

export default useLogin;
