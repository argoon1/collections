import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosMain } from "../api/axiosConfig";
import { Item } from "../sharedTypes/collectionSharedTypes";
import { useState } from "react";
import { ContextProviderProps } from "./contextSharedTypes";
type CollectionItemContextValue = {
  itemData: null | Item;
  isUserOwner: boolean;
  getItemData: (itemId: string) => Promise<void>;
};
const CollectionItemContexInitialValue = {
  itemData: null,
  isUserOwner: false,
  getItemData: () => Promise.resolve(),
};
const CollectionItemContext = React.createContext<CollectionItemContextValue>(
  CollectionItemContexInitialValue
);
export const CollectionItemProvider = ({ children }: ContextProviderProps) => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState<null | Item>(null);
  const [isUserOwner, setIsUserOwner] = useState(false);
  async function getItemData(itemId: string) {
    try {
      const {
        data: { item: itemData, isUserOwner },
      } = await axiosMain.get(`/users/collections/collection/item/${itemId}`);
      setItemData(itemData);
      setIsUserOwner(isUserOwner);
    } catch (e) {}
  }
  return (
    <CollectionItemContext.Provider
      value={{ itemData, isUserOwner, getItemData }}
    >
      {children}
    </CollectionItemContext.Provider>
  );
};
export const useCollectionItem = () => useContext(CollectionItemContext);
