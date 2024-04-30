'use client'
import { useFormState,useFormStatus } from 'react-dom';
import { SignWithProvider } from '../lib/action';
const initState = {
  errorMsg: "",
  success: false
};

export default function ProviderSignInButton({provider} : {provider?: string}) {
  const [state, dispatch] = useFormState(SignWithProvider, initState);
  const { pending } = useFormStatus();
  return (
    <>
    <form action={dispatch}
    >
      <input name='provider' style={{display:'none'}} defaultValue={provider}></input>
      {state?.errorMsg && <p> {state.errorMsg} </p>}
      <button type="submit" aria-disabled={pending}>Sign With {provider}</button>
    </form>
   </>
  )
    
};

