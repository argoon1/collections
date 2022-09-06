import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getAuthFetchOptions } from "../../utils/utilsAuth";
import * as yup from "yup";
import { useState } from "react";
import { axiosMain } from "../../../../../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { getAxiosPostOptions } from "../../../../../../utils/axiosUtils";
import { useCollectionItem } from "../../../../../../Context/collectionItemProvider/CollectionItemProvider";
import axios from "axios";
export type CommentData = {
  commentText: string;
};
const schema = yup.object().shape({
  commentText: yup.string().required(),
});

const useAddNewCommentForm = () => {
  const { getItemData } = useCollectionItem();
  const [addCommentError, setAddCommentError] = useState("");
  const { itemId } = useParams();
  async function submitComment(data: CommentData) {
    try {
      await axiosMain.post(
        `/users/collections/comment/${itemId}`,
        ...getAxiosPostOptions(data)
      );

      if (itemId) return getItemData(itemId);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.status;
        if (status === "404") return setAddCommentError("item not found");
        setAddCommentError("adding comment failed");
      }
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    submitComment,
    errors,
    addCommentError,
  };
};

export { useAddNewCommentForm };
