import { useEffect } from "react";
import { axiosMain } from "../../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Collection } from "../../../sharedTypes/collectionSharedTypes";
const useCollection = () => {
  const [requestedCollection, setRequestedCollection] =
    useState<null | Collection>(null);
  const [isUserOwner, setIsUserOwner] = useState(false);
  async function getRequestedCollection() {
    try {
      const {
        data: { collection, isUserOwner },
      } = await axiosMain.get(`/users/collections/collection/${id}`, {
        withCredentials: true,
      });
      setRequestedCollection(collection);
      setIsUserOwner(isUserOwner);
    } catch (e) {}
  }
  const { id } = useParams();
  useEffect(() => {
    if (id) getRequestedCollection();
  }, [id]);
  return {
    requestedCollection,
    isUserOwner,
  };
};

export { useCollection };
