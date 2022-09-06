import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthProvider";
import { getAxiosPostOptions } from "../../../utils/axiosUtils";
const schema = yup.object().shape({
  name: yup.string().required(),
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
  const { id } = useParams();
  async function submitItem(data: any) {
    try {
      await axiosMain.post(
        `/users/collections/collection/additem/${id}`,
        ...getAxiosPostOptions(data)
      );
      alert("item added");
    } catch (e) {}
  }
  return {
    register,
    handleSubmit,
    errors,
    submitItem,
    addItemError,
  };
};

export { useAddCollectionItem };
