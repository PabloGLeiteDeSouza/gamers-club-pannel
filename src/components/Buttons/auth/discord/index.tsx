"use client"
import { useSession, signIn, signOut } from "next-auth/react";

const ButtonDiscordAuth: React.FC = () => {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Signed in as {session.user.address} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => { signIn('discord') }}>Sign in with Discord</button>
      </>
    )
  
}

export default ButtonDiscordAuth;