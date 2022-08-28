import React, { useState, useContext } from "react";
import { AllowedRoles } from "../sharedTypes/authTypes";
type AuthStateType = {
  roles: AllowedRoles | null;
  accessToken: string | null;
};
type AuthProviderProps = { children: JSX.Element };
const AuthContext = React.createContext<AuthStateType>({
  roles: null,
  accessToken: null,
});
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthStateType>({
    roles: null,
    accessToken: null,
  });
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
