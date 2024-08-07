import FormRegistro from "@/components/Forms/Registro";


const PageRegistro: React.FC = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col" >
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Registre-se abaixo:</h2>
            </div>
            <div>
                <FormRegistro/>
            </div>
        </div>
    )
}

export default PageRegistro;