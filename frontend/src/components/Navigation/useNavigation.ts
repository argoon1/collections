import { useAuth } from "../../Context/AuthProvider";
import { AllowedRoles } from "../../sharedTypes/authTypes";
const useNavigation = () => {
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

export default useNavigation;
