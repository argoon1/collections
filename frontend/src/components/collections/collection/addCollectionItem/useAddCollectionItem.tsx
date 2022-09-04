import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { axiosMain } from "../../../../api/axiosConfig";
import { getAxiosPostOptions } from "../../../../utils/axiosUtils";
const LOGIN_URL = "/sessions/login";

const schema = yup.object().shape({
  name: yup.string().required(),
  tags: yup.string().required(),
});

const useAddCollectionItem = (id: string) => {
  const navigate = useNavigate();
  const [addItemError, setAddItemError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors, "er");
  function handleAddItemError(e: unknown) {
    if (axios.isAxiosError(e)) {
      const status = e.status;
      switch (status) {
        case "400":
          setAddItemError("invalid data");
          break;
        case "401":
          setAddItemError("invalid credentials, try again");
          break;
        default:
          setAddItemError("login failed");
      }
      return;
    }
    setAddItemError("login failed");
  }
  async function submitItem(data: any) {
    const { tags } = data;
    //validate tags seperated by coma
    try {
      await axiosMain.post(
        `/users/collections/collection/additem/${id}`,
        ...getAxiosPostOptions({ ...data, tags: tags.split(",") })
      );
      console.log(data);
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
