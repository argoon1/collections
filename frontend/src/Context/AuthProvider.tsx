import React from 'react';
type AuthProviderProps = {children:JSX.Element}
const AuthContext = React.createContext({})
const AuthProvider = ({children}:AuthProviderProps) => {
  return <AuthContext.Provider value={'a'}>
     {children}
     </AuthContext.Provider>;
};

export default AuthProvider;
