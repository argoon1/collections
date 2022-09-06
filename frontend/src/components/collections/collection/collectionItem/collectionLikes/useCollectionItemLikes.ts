import { useParams } from "react-router-dom";
import { axiosMain } from "../../../../../api/axiosConfig";
import { useCollectionItem } from "../../../../../Context/collectionItemProvider/CollectionItemProvider";
const useCollectionItemLikes = () => {
  const { itemId } = useParams();
  const { getItemData } = useCollectionItem();
  async function likeItem(
    itemId: string,
    updateCollectionData?: () => Promise<void>
  ) {
    try {
      await axiosMain.post(
        `users/collections/like/${itemId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      updateCollectionData ? updateCollectionData() : getItemData(itemId);
    } catch (e) {}
  }
  return { likeItem };
};

export { useCollectionItemLikes };
