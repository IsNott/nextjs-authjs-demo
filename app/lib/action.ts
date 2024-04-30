'use server'
import { LoginState ,User } from "./definitions";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { LiteralUnion } from 'next-auth/react'
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

export async function SignWithProvider( pervState: LoginState | undefined,
  formData: FormData): Promise<LoginState>  {
  const providerData : any | null = formData.get('provider');
  const provider : LiteralUnion<string> = providerData ?  providerData as string : ''
  console.log('debug issues-02:',provider);
  const result = await signIn(provider)
  console.log('debug issues-03:',result);
  return {
    success: true,
    errorMsg: null
  }
}

export async function FetchGitHubUserInfo(code : string) {
  const clientID = process.env.AUTH_GITHUB_ID
  const clientSecret = process.env.AUTH_GITHUB_SECRET
  const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`
  const headers = {
    accept: 'application/json'
  }
  const accessTokenReuslt = await fetch(url,{headers})
  console.log('debug issue-03: ',accessTokenReuslt);
  
  
}