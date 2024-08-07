"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IVerifyLoginProps } from "./interfaces";

const VerifyLogin: React.FC<IVerifyLoginProps> = ({children}) => {
    const { status } = useSession();

    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/login")
        return null
    }
    return (
        <>
            {children}
        </>
    );
}

export default VerifyLogin;