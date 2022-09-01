import React from "react";
import { Outlet } from "react-router-dom";
import { NotFound } from "../components/notFound/NotFound";
import { useAuth } from "../Context/AuthProvider";
import { AllowedRoles } from "../sharedTypes/authTypes";
type PrivateRoutesProps = {
  allowedRoles: AllowedRoles;
};
export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesProps) => {
  const {
    userData: { roles, accessToken },
  } = useAuth();
  function userIsAllowed() {
    return roles?.some((role) => allowedRoles.includes(role));
  }
  console.log(accessToken);
  if (userIsAllowed() && accessToken) {
    return <Outlet />;
  }
  return <NotFound />;
};
