import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthProvider";
const schema = yup.object().shape({
  itemName: yup.string().required(),
  description: yup.string(),
});
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

const useAddCollectionItem = () => {
  const [addItemError, setAddItemError] = useState("");
  function submitItem() {}
  return {
    register,
    handleSubmit,
    errors,
    submitItem,
    addItemError,
  };
};

export default useAddCollectionItem;
