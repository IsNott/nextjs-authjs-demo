export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type LoginState = {
  success: boolean;
  errorMsg: string | null;
}