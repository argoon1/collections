import { axiosPrivate } from "../api/axiosConfig";
import { useAuth } from "../Context/authProvider/AuthProvider";

export const useRefreshToken = () => {
  const { setUserData } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.get("/sessions/refresh", {
      withCredentials: true,
    });
    const { roles, accessToken } = response.data;
    console.log(response.data);
    setUserData((prev) => {
      return {
        ...prev,
        roles,
        accessToken,
      };
    });
    return accessToken;
  };
  return refresh;
};
