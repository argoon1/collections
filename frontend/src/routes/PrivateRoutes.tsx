import React from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import { useAuth } from "../Context/AuthProvider";
import { AllowedRoles } from "../sharedTypes/authTypes";
type PrivateRoutesProps = {
  allowedRoles: AllowedRoles;
};
const PrivateRoutes = ({ allowedRoles }: PrivateRoutesProps) => {
  const { roles } = useAuth();
  function userIsAllowed() {
    return roles?.some((role) => allowedRoles.includes(role));
  }
  if (userIsAllowed()) {
    return <Outlet />;
  }
  return <NotFound />;
};

export default PrivateRoutes;
