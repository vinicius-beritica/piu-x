import { ReactNode, createContext, useState } from "react";

type AuthProps = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  handle: string;
  setHandle: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  image_url: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
};
interface AuthProvidePros {
  children: ReactNode;
}
export const AuthContext = createContext<AuthProps>({} as AuthProps);

function AuthProvider({ children }: AuthProvidePros) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        handle,
        setHandle,
        name,
        setName,
        image_url,
        setImageUrl,
        verified,
        setVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
