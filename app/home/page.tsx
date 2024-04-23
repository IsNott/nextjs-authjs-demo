'use client'
import { useSession } from "next-auth/react";

export default function Index() {
  const { data }: { data: any } = useSession();
  const session = data?.session;
  return(
    <div className="text-center">
      <text>hello next-auth, I'm { session ? session.user.name : '' }</text>
    </div>
  )
};
