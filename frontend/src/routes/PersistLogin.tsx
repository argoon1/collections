import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "../Context/AuthProvider";
import { NotFound } from "../components/notFound/NotFound";
export const PersistLogin = () => {
  const refresh = useRefreshToken();
  const {
    userData: { accessToken },
    persist,
  } = useAuth();

  useEffect(() => {
    console.log(accessToken);
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!accessToken && persist) verifyRefreshToken();
  }, []);

  return <Outlet />;
};
