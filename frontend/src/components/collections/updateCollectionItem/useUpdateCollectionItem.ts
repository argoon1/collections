import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollectionItem } from "../../../Context/collectionItemProvider/CollectionItemProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../../../api/axiosConfig";
import { useState } from "react";
import axios from "axios";
import { getAxiosPostOptions } from "../../../utils/axiosUtils";
const schema = yup.object().shape({
  name: yup.string().required(),
  tags: yup.string().required(),
});
const additionalFieldsNames = [
  "string",
  "integer",
  "multiline",
  "checkboxes",
  "date",
];
const useUpdateCollectionItem = () => {
  const { id } = useParams();
  const { itemData, getItemData } = useCollectionItem();
  const [addItemError, setAddItemError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
  function getAdditionalFieldsFormatted(data: any) {
    if (!itemData) return;
    const additionalFields = Object.entries(data).filter(([fieldName]) =>
      additionalFieldsNames.includes(fieldName)
    );
  }
  getAdditionalFieldsFormatted(itemData);
  async function submitItem(data: any) {
    const { tags } = data;
    //validate tags seperated by coma
    try {
      await axiosMain.post(
        `/users/collections/collection/additem/${id}`,
        ...getAxiosPostOptions({ ...data, tags: tags.split(",") })
      );
    } catch (e) {}
  }
  useEffect(() => {
    alert(id);
    if (id) getItemData(id);
  }, [id]);
  return { itemData, register, handleSubmit, errors, submitItem };
};

export default useUpdateCollectionItem;
