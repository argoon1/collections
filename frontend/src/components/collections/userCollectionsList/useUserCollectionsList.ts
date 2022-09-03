import { axiosMain } from "../../../api/axiosConfig";
import { useState, useEffect } from "react";
const useUserCollectionsList = () => {
  const [usersCollections, setUsersCollections] = useState<null | any[]>(null);
  async function getUsersCollections() {
    try {
      const {
        data: { collections },
      } = await axiosMain.get("users/collections/usercollections", {
        withCredentials: true,
      });
      setUsersCollections(collections);
    } catch (e) {}
  }
  useEffect(() => {
    getUsersCollections();
  }, []);
  return {};
};

export { useUserCollectionsList };
