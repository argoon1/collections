import { useAuth } from "../../Context/AuthProvider";
import { AllowedRoles } from "../../sharedTypes/authTypes";
import { axiosMain } from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { initialUserData } from "../../Context/AuthProvider";
export const useNavigation = () => {
  const {
    userData: { roles, accessToken },
    setPersist,
    setUserData,
  } = useAuth();
  function userHasRole(role: Required<AllowedRoles>[number]) {
    return roles && role in roles;
  }
  const navigate = useNavigate();
  function logout() {
    axiosMain.post("/sessions/logout", {}, { withCredentials: true });
    setPersist(false);
    setUserData(initialUserData);
    navigate("/login");
  }
  return {
    roles,
    userExists: !!accessToken,
    userHasRole,
    logout,
  };
};
