import { Button } from "react-bootstrap";
import { useAuth } from "../../../../../Context/AuthProvider";
import { useCollectionItemLikes } from "./useCollectionItemLikes";
type CollectionLikesProps = {
  likes: number;
  itemId: string;
  getData?: () => Promise<void>;
};
const CollectionItemLikes = ({
  likes,
  itemId,
  getData,
}: CollectionLikesProps) => {
  const {
    userData: { accessToken },
  } = useAuth();
  const { likeItem } = useCollectionItemLikes();
  return (
    <section>
      {likes}
      {accessToken && (
        <Button onClick={() => likeItem(itemId, getData)}>Like</Button>
      )}
    </section>
  );
};

export { CollectionItemLikes };
