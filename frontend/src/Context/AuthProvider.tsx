import React, { useState, useContext } from "react";
import { AllowedRoles } from "../sharedTypes/authTypes";
import { useLocalStorage } from "usehooks-ts";
export const initialUserData = {
  roles: null,
  accessToken: null,
};
export const initialAuthContextValue = {
  userData: initialUserData,
  setUserData: () => {},
  persist: false,
  setPersist: () => {},
};
type UserData = {
  roles: AllowedRoles | null;
  accessToken: string | null;
};
type AuthStateType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  persist: boolean;
  setPersist: (persist: boolean) => void;
};
type AuthProviderProps = { children: JSX.Element | JSX.Element[] };
const AuthContext = React.createContext<AuthStateType>(initialAuthContextValue);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [persist, setPersist] = useLocalStorage("persist", false);
  const [userData, setUserData] = useState<UserData>({
    roles: null,
    accessToken: null,
  });
  console.log("context", userData);
  return (
    <AuthContext.Provider
      value={{ userData, setUserData, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};
