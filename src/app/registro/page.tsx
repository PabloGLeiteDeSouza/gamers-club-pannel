import FormRegistro from "@/components/Forms/Registro";


const PageRegistro: React.FC = () => {
    return (
        <div className="my-10 w-full flex items-center justify-center flex-col gap-5" >
            <div className="mb-10 mt-10" >
                <h2 className="text-4xl font-bold">Registre-se abaixo:</h2>
            </div>
            <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl" >
                <FormRegistro/>
            </div>
        </div>
    )
}

export default PageRegistro;