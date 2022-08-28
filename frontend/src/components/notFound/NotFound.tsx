import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const navigateToPrev = () => {
    navigate(-1);
  };
  return <Button onClick={navigateToPrev}>return</Button>;
};

export default NotFound;
