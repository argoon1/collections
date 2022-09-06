import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "../Context/AuthProvider";
export const PersistLogin = () => {
  const refresh = useRefreshToken();
  const {
    userData: { accessToken },
    persist,
  } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {}
    };

    if (!accessToken && persist) verifyRefreshToken();
  }, []);

  return <Outlet />;
};
