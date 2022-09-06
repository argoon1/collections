import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/authProvider/AuthProvider";
import { AllowedRoles } from "../sharedTypes/authTypes";
import { NotFound } from "../components/notFound/NotFound";
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

  if (userIsAllowed() && accessToken) {
    return <Outlet />;
  }
  return <NotFound />;
};
