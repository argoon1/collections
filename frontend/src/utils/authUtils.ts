import { AuthData } from "../components/auth/authSharedTypes";
import { CollectionData } from "../components/collections/addCollection/useAddCollectionForm";
export function getAxiosPostOptions(data: AuthData | CollectionData) {
  return [
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  ];
}
