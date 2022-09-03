import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import { AuthData } from "../authSharedTypes";
import axios from "axios";
import { getAxiosPostOptions } from "../../../utils/authUtils";
import { useAuth } from "../../../Context/AuthProvider";
const LOGIN_URL = "/sessions/login";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const useLoginForm = () => {
  const { setUserData } = useAuth();
  const navigate = useNavigate();
  const { setPersist } = useAuth();
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
      const {
        data: { accessToken, roles },
      } = await axiosMain.post(LOGIN_URL, ...getAxiosPostOptions(data));
      setUserData({ accessToken, roles });
      setPersist(true);
      navigate("/collections");
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
