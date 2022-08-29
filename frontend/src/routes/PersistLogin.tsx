import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../Context/AuthProvider";
import NotFound from "../components/notFound/NotFound";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const {
    userData: { accessToken },
    persist,
  } = useAuth();

  useEffect(() => {
    let isMounted = true;
    console.log(accessToken);
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !persist) {
    return <NotFound />;
  }
  return <Outlet />;
};

export default PersistLogin;
