import React, { useState, useContext } from "react";
import { AllowedRoles } from "../sharedTypes/authTypes";
import { useLocalStorage } from "usehooks-ts";
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
const AuthContext = React.createContext<AuthStateType>({
  userData: {
    roles: null,
    accessToken: null,
  },
  setUserData: () => {},
  persist: false,
  setPersist: () => {},
});
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [persist, setPersist] = useLocalStorage("persist", false);
  const [userData, setUserData] = useState<UserData>({
    roles: null,
    accessToken: null,
  });
  console.log("context");
  return (
    <AuthContext.Provider
      value={{ userData, setUserData, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
