import { AuthData } from "../components/auth/authSharedTypes";
import { CollectionDataFormatted } from "../components/collections/addCollection/useAddCollectionForm";
export function getAxiosPostOptions(data: AuthData | CollectionDataFormatted) {
  return [
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  ];
}
