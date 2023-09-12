import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { Link, useNavigate } from "react-router-dom";
import { postRegisterRequest } from "../service/postPius";
import * as Props from "../../src/service/structure";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const initialPage = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningUp(true);
    try {
      const response = await postRegisterRequest({
        name: name,
        handle: handle,
        password: password,
      } as Props.PropsRegister);
      console.log(response.status);
      if (response.status === 201) {
        initialPage("/");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Network Error") {
        alert("Erro de rede");
      } else {
        alert("Usuário existe, tente novamente.");
      }
    } finally {
      setSigningUp(false);
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
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {}
        <Button loading={signingUp} thickness="thick">
          Cadastrar
        </Button>
        <Link className="pt-4 hover:underline mx-auto " to="/login">
          Voltar para o Login
        </Link>
      </form>
    </AuthFormLayout>
  );
};
