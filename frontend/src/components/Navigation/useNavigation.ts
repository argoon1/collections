import { useAuth } from "../../Context/AuthProvider";
import { AllowedRoles } from "../../sharedTypes/authTypes";
export const useNavigation = () => {
  const {
    userData: { roles, accessToken },
  } = useAuth();
  function userHasRole(role: Required<AllowedRoles>[number]) {
    return roles && role in roles;
  }
  return {
    roles,
    userExists: !!accessToken,
    userHasRole,
  };
};
