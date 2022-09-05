import { AuthData } from "../components/auth/authSharedTypes";
import { CollectionDataFormatted } from "../components/collections/addCollection/useAddCollectionForm";
import { CommentData } from "../components/collections/collection/collectionItem/collectionItemDetails/addNewCommentForm/useAddNewCommentForm";
export function getAxiosPostOptions(
  data: AuthData | CollectionDataFormatted | CommentData
) {
  return [
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  ];
}
