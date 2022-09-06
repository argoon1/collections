import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const navigate = useNavigate();
  const navigateToPrev = () => {
    navigate("home");
  };
  return <Button onClick={navigateToPrev}>return home</Button>;
};
