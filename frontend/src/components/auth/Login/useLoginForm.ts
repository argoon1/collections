import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import { AuthData } from "../authSharedTypes";
import axios from "axios";
import { getAxiosAuthOptions } from "../authUtils";
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
  function handleLoginError(e: unknown) {
    if (axios.isAxiosError(e)) {
      const status = e.status;
      switch (status) {
        case "400":
          setLoginError("invalid data");
          break;
        case "401":
          setLoginError("invalid credentials, try again");
          break;
        default:
          setLoginError("login failed");
      }
      return;
    }
    setLoginError("login failed");
  }
  async function submitLogin(data: AuthData) {
    try {
      let x = await axiosMain.post(LOGIN_URL, ...getAxiosAuthOptions(data));
      console.log("finished login, token: ", x.data);
    } catch (e) {
      handleLoginError(e);
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
