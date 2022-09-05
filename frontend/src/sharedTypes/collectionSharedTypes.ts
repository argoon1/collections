import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { AdditionalFieldsNames } from "../components/collections/addCollection/useAddCollectionForm";
export type AdditionalFieldsCollection = Partial<
  Record<AdditionalFieldsNames, [string, string?, string?]>
>;
export type AdditionalFieldsItem = Partial<
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
