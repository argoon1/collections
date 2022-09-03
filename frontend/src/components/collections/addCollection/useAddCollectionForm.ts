import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { useState } from "react";
import { axiosMain } from "../../../api/axiosConfig";
import axios from "axios";
import { getAxiosPostOptions } from "../../../utils/authUtils";
const additionalFieldsNames = [
  "integer",
  "string",
  "multiline",
  "checkboxes",
  "date",
] as const;
export type CollectionData = {
  name: string;
  description: string;
} & Record<typeof additionalFieldsNames[number], string>;
const REGISTER_URL = "/users/collections/add";
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});
const useAddCollectionForm = () => {
  const [addCollectionFormError, setAddCollectionFormError] = useState("");
  function handleCollectionError(e: unknown) {
    if (axios.isAxiosError(e) && e.status === "400") {
      setAddCollectionFormError("invalid data");
      return;
    }
    setAddCollectionFormError("registration failed");
  }
  async function submitCollection(data: CollectionData) {
    //create custom validation

    const formatedAdditionFieldsDataArray = Object.entries(data)
      .map(([name, value]) => {
        if (name === "description" || name === "name") return [name, value];
        console.log(name);
        return [name, value.split(",")];
      })
      .filter(([name, value]) => value[0]);
    console.log(formatedAdditionFieldsDataArray, "dates");
    // await axiosMain.post(
    //   "/users/collections/add",
    //   ...getAxiosPostOptions(data)
    // );
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionData>({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    submitCollection,
    errorMessage: "",
  };
};

export { useAddCollectionForm, additionalFieldsNames };
