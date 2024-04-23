'use client'

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/action";
const initState = {
  errorMsg: "",
  success: false
};

export default function LoginPage() {
  const [state, dispatch] = useFormState(authenticate, initState);
  const { pending } = useFormStatus();

  return(
    <div style={{width:300,height:300,margin:'auto'}}>
      <form style={{display:"flex",flexDirection:"column",marginTop:50,textAlign:'left'}} action={dispatch}>
      <input placeholder="email" name="email"/>
      <input placeholder="password"  name="password" type="password"/>
      <button type="submit" aria-disabled={pending}>Login</button>
      {!state.success && state.errorMsg && (
            <>
              <p className="text-sm text-red-500">{state.errorMsg}</p>
            </>
          )}
    </form>
    </div>
  )
}