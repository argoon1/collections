import React, { useState, useContext } from "react";
import { AllowedRoles } from "../sharedTypes/authTypes";
import { useLocalStorage } from "usehooks-ts";
import { ContextProviderProps } from "./contextSharedTypes";
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
type AuthContextValue = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  persist: boolean;
  setPersist: (persist: boolean) => void;
};

const AuthContext = React.createContext<AuthContextValue>(
  initialAuthContextValue
);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: ContextProviderProps) => {
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
