export interface PropsLogin {
  token: string;
  exp: string;
  user: {
    handle: string;
    password: string;
    name: string;
    image: string;
    verified: boolean;
  };
}
export interface PropsRegister {
  name: string;
  handle: string;
  password: string;
}
