import FormLogin from "@/components/Forms/Login";
import Image from "next/image";


const LoginPage: React.FC = () => {
    return (
        <div  className="h-screen w-full flex flex-col items-center justify-between" >
            <div className="h-1/3 flex flex-col items-center justify-center" >
                <Image src="" alt="" />
            </div>
            <FormLogin/>
            <div className="h-1/3" >

            </div>
        </div>
    )
}

export default LoginPage;