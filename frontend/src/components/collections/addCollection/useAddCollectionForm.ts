import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { useState } from "react";
import { axiosMain } from "../../../api/axiosConfig";
import axios from "axios";
import { getAxiosPostOptions } from "../../../utils/axiosUtils";
import { useAuth } from "../../../Context/authProvider/AuthProvider";
const ADD_COLLECTION = "/users/collections/add";
type CollectionDataRequired = {
  name: string;
  description: string;
  topic: string;
};
const additionalFieldsNames = [
  "integer",
  "string",
  "multiline",
  "checkboxes",
] as const;
export type AdditionalFieldsNames = typeof additionalFieldsNames[number];
export type CollectionData = CollectionDataRequired &
  Record<AdditionalFieldsNames, string>;
export type CollectionDataFormatted = CollectionDataRequired &
  Record<AdditionalFieldsNames, string[]>;
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  topic: yup.string().required(),
});
const useAddCollectionForm = () => {
  const [addCollectionFormError, setAddCollectionFormError] = useState("");
  function handleCollectionError(e: unknown) {
    if (axios.isAxiosError(e) && e.status === "400") {
      setAddCollectionFormError("invalid data");
      return;
    }
    setAddCollectionFormError("adding item  failed");
  }
  function getFormatedAdditionFieldsData(data: CollectionData) {
    return Object.fromEntries(
      Object.entries(data)
        .map(([name, value]) => {
          if (name === "description" || name === "name") return [name, value];
          return [name, value.match(/[^,][a-zA-Z\s]+/gi)];
        })
        .filter(([_, value]) => value && value[0])
    );
  }
  async function submitCollection(data: CollectionData) {
    const formatedAdditionFieldsData = getFormatedAdditionFieldsData(data);
    try {
      await axiosMain.post(
        ADD_COLLECTION,
        ...getAxiosPostOptions(formatedAdditionFieldsData)
      );
    } catch (e) {
      handleCollectionError(e);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionData>({
    resolver: yupResolver(schema),
    defaultValues: {
      topic: "Books",
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    submitCollection,
    addCollectionFormError,
  };
};

export { useAddCollectionForm, additionalFieldsNames };
