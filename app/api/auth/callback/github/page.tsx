'use client'

import { useSearchParams } from "next/navigation"

export default function page() {
  const param = useSearchParams()
  return(
    <div style={{margin:'auto'}}>
    <p style={{padding: 30}}> this is github call back! {param.get('code')}</p>
    </div>
  )
};
