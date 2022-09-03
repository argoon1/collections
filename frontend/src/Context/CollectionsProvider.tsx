import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { axiosMain } from "../api/axiosConfig";
import { AdditionalFieldsNames } from "../components/collections/addCollection/useAddCollectionForm";
import { useParams } from "react-router-dom";
export type AdditionalFieldsCollection = Partial<
  Record<AdditionalFieldsNames, [string, string?, string?]>
>;
type AdditionalFieldsItem = Partial<
  Record<AdditionalFieldsNames, { [key: string]: string }>
>;
export type Item = {
  likes: number;
  comments: string[];
  id: string;
  name: string;
  tags: string[];
} & AdditionalFieldsItem;
export type Collection = {
  name: string;
  description: string;
  topic: string;
  id: string;
  items: Item[];
} & AdditionalFieldsCollection;
const initialCollectionsContextValue = {
  curUserCollections: null,
  collections: null,
};
type CollectionContextValue = {
  curUserCollections: null | Collection[];
  collections: null | Collection[];
};

const useCollections = () => useContext(CollectionsContext);

type CollectionsProviderProps = { children: JSX.Element | JSX.Element[] };
const CollectionsContext = React.createContext<CollectionContextValue>(
  initialCollectionsContextValue
);
const CollectionsProvider = ({ children }: CollectionsProviderProps) => {
  const {
    userData: { accessToken },
  } = useAuth();
  const [curUserCollections, setCurUserCollections] = useState<null | any[]>(
    null
  );
  const [collections, setCollections] = useState<null | any[]>(null);

  async function getUsersCollections() {
    try {
      const {
        data: { collections },
      } = await axiosMain.get("users/collections/usercollections", {
        withCredentials: true,
      });
      setCurUserCollections(collections);
    } catch (e) {}
  }

  async function getAllCollections() {
    console.log("fetch start");
    const { data: collections } = await axiosMain.get(
      "/users/collections/all",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(collections, "DATA");
    setCollections(collections);
  }
  useEffect(() => {
    getAllCollections();
  }, []);

  useEffect(() => {
    if (accessToken) getUsersCollections();
  }, [accessToken]);
  return (
    <CollectionsContext.Provider value={{ collections, curUserCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
};

export { CollectionsProvider, useCollections };
