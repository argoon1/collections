import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { useState } from "react";
import { axiosMain } from "../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthData } from "../authSharedTypes";
import { getAxiosAuthOptions } from "../authUtils";

const REGISTER_URL = "/users";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const useRegister = () => {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  function handleReigsterError(e: unknown) {
    if (axios.isAxiosError(e)) {
      const status = e.status;
      switch (status) {
        case "400":
          setRegisterError("invalid data");
          break;
        case "409":
          setRegisterError("duplicate email");
          break;
        default:
          setRegisterError("registration failed");
      }
      return;
    }
    setRegisterError("registration failed");
  }
  async function submitRegister(data: AuthData) {
    try {
      await axiosMain.post(REGISTER_URL, ...getAxiosAuthOptions(data));
      navigate("/login");
    } catch (e) {
      handleReigsterError(e);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    submitRegister,
    errorMessage: "",
  };
};

export default useRegister;
