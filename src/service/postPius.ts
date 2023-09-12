import { apiPiu } from "./api";
import * as Props from "./structure";

export const postLoginRequest = (values: Props.PropsLogin) => {
  return apiPiu.post<Props.PropsLogin>(`/login`, {
    handle: values.user.handle,
    password: values.user.password,
  });
};

export const postRegisterRequest = (values: Props.PropsRegister) => {
  return apiPiu.post<Props.PropsRegister>(`/signup`, {
    name: values.name,
    handle: values.handle,
    password: values.password,
  });
};
