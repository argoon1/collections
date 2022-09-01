import { useAuth } from "../../../Context/AuthProvider";
export const CollectionsList = () => {
  const { userData } = useAuth();

  return <div>Collections</div>;
};
