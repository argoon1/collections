import { useAuth } from "../../../Context/AuthProvider";
const Collections = () => {
  const { userData } = useAuth();
  console.log(userData);
  return <div>Collections</div>;
};

export default Collections;
