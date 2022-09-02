import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { axiosMain } from "../api/axiosConfig";
export const initialUserData = {
  roles: null,
  accessToken: null,
};
const initialAuthContextValue = {};
type CollectionContextValue = {};

const useCollections = () => useContext(CollectionsContext);

type CollectionsProviderProps = { children: JSX.Element | JSX.Element[] };
const CollectionsContext = React.createContext<CollectionContextValue>(
  initialAuthContextValue
);
const CollectionsProvider = ({ children }: CollectionsProviderProps) => {
  const {
    userData: { accessToken },
  } = useAuth();

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
  }
  useEffect(() => {
    getAllCollections();
  }, [accessToken]);
  function getAllUsers() {
    axiosMain.get("/users");
  }
  getAllUsers();
  return (
    <CollectionsContext.Provider value={{}}>
      {children}
    </CollectionsContext.Provider>
  );
};

export { CollectionsProvider, useCollections };
