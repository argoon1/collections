import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { useState } from "react";
//import { handleRespData } from "../../utils/utilsAuth";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  name: yup.string().required(),
});

const useRegister = () => {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  async function submitRegister(data: any) {}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
