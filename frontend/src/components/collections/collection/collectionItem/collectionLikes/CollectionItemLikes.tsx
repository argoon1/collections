import { Button } from "react-bootstrap";
import { useAuth } from "../../../../../Context/AuthProvider";
import { likeItem } from "./collectionItemLikesUtils";
type CollectionLikesProps = {
  likes: number;
  itemId: string;
};
const CollectionItemLikes = ({ likes, itemId }: CollectionLikesProps) => {
  const {
    userData: { accessToken },
  } = useAuth();
  return (
    <section>
      {likes}
      {accessToken && <Button onClick={() => likeItem(itemId)}>Like</Button>}
    </section>
  );
};

export { CollectionItemLikes };
