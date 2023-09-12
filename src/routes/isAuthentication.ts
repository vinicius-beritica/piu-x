import { AuthContext } from "../Context/AuthContext";
import { apiPiu } from "../service/api";
import { useContext } from "react";

export function isAuthenticated() {
  const authContext = useContext(AuthContext);
  let userToken: string | null = null;
  const authToken = localStorage.getItem("token");
  if (authToken !== null) {
    userToken = JSON.parse(authToken);
    apiPiu.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${userToken}`;
      return config;
    });
  }

  return authContext.auth || userToken;
}
