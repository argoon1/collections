import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "../Context/authProvider/AuthProvider";
export const PersistLogin = () => {
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const {
    userData: { accessToken },
    persist,
    setPersist,
  } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        setPersist(false);
        navigate("/login");
      }
    };

    if (!accessToken && persist) verifyRefreshToken();
  }, []);

  return <Outlet />;
};
