import { createContext, useState } from "react";

type AuthProps = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AuthContext = createContext<AuthProps>({
  auth: true,
  setAuth: () => {},
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(true);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
