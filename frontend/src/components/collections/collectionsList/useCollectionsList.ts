import { axiosMain } from "../../../api/axiosConfig";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Collection } from "../../../sharedTypes/collectionSharedTypes";
const useCollectionsList = () => {
  const [collections, setCollections] = useState<null | Collection[]>(null);
  const { pathname } = useLocation();
  const USER_COLLECTIONS = "users/collections/usercollections";
  const LARGEST_COLLECTIONS = "users/collections/largest";
  function isHomePage() {
    return pathname.includes("home");
  }
  function getCorrectCollectionUrl() {
    return isHomePage() ? LARGEST_COLLECTIONS : USER_COLLECTIONS;
  }
  async function getCollections() {
    try {
      const {
        data: { collections },
      } = await axiosMain.get(getCorrectCollectionUrl(), {
        withCredentials: true,
      });
      setCollections(collections);
    } catch (e) {}
  }
  useEffect(() => {
    getCollections();
  }, []);
  return {
    collections,
    isHomePage: isHomePage(),
  };
};

export { useCollectionsList };
