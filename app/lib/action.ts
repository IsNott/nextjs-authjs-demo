'use server'
import { LoginState ,User } from "./definitions";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

// 登录
export async function authenticate(
  pervState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  try {
    const user: User = await signIn("credentials", formData);
    return {
      success: true,
      errorMsg: null
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errorMsg: "Invalid credentials.",
            success: false
          };
        default:
          return {
            errorMsg: "Something went wrong.",
            success: false
          };
      }
    }
    throw error;
  }
}