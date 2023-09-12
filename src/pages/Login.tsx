import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { Link, useNavigate } from "react-router-dom";
import { apiPiu } from "../service/api";
import { AuthContext } from "../Context/AuthContext";
import * as Props from "../../src/service/structure";
import { postLoginRequest } from "../service/postPius";
import { routes } from "../routes";

export interface PropsLogin {
  token: string;
  handle: string;
  name: string;
  password: string;
}

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const userPage = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await postLoginRequest({
        user: { handle: user, password },
      } as Props.PropsLogin);

      if (response.status === 200) {
        apiPiu.interceptors.request.use((config) => {
          config.headers.Authorization = response.data.token;
          return config;
        });

        authContext.setToken(response.data.token);
        authContext.setHandle(response.data.user.handle);
        authContext.setName(response.data.user.name);
        authContext.setImageUrl(response.data.user.image);
        authContext.setVerified(response.data.user.verified);

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("exp", JSON.stringify(response.data.exp));

        authContext.setAuth(true);
        userPage(`/home`);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Network Error") {
        alert("Erro de rede");
      } else {
        alert("Usuário ou senha incorretos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormLayout>
      <form
        onSubmit={onSubmit}
        className="flex justify-center w-[min(384px,100%)] md:w-[min(566px,100%)] gap-4 flex-col"
      >
        <h1 className="text-5xl font-bold mb-8">Rolando agora</h1>
        <h2 className="text-2xl font-bold mb-8">Junte-se aos bons</h2>
        <Input
          placeholder="Handle"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button loading={isLoading} thickness="thick">
          Login
        </Button>
        <Link className="pt-4 hover:underline mx-auto " to={routes.signup}>
          Cadastrar
        </Link>
      </form>
    </AuthFormLayout>
  );
};
