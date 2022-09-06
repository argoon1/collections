import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollectionItem } from "../../../../../Context/CollectionItemProvider";
const useCollectionItemDetailed = () => {
  const { itemData, isUserOwner, getItemData } = useCollectionItem();
  const { itemId } = useParams();
  useEffect(() => {
    if (itemId) getItemData(itemId);
  }, [itemId]);
  return { itemData, isUserOwner, getItemData };
};

export { useCollectionItemDetailed };
