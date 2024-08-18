"use client"
import { Formik } from "formik"
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaDiscord, FaEye, FaEyeSlash, FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import *  as Yup from "yup";


const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo e obrigatorio!'),
    usuario: Yup.string().required('O campo e obrigatorio!'),
    email: Yup.string().required('O campo e obrigatorio!').email('O email nao e valido tente novamente!'),
    confirma_email: Yup.string().required('O campo e obrigatorio!').email('O email nao e valido tente novamente!').oneOf([Yup.ref('email')], 'Os emails estao divergentes corrija e tente novamente!'),
    senha: Yup.string().required('O campo e obrigatorio!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, 'A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'),
    confirma_senha: Yup.string().required('O campo e obrigatorio').oneOf([Yup.ref('senha')], "As senhas estao divergentes por favor corrija-as e tente novamente!"),
    aceito_termos_de_uso: Yup.boolean().oneOf([true], 'Para prosseguir você deve concordar com nossos termos de uso!').required('Para prosseguir você deve concordar com nossos termos de uso!'),
})


const FormRegistro: React.FC = () => {

    const [passwordsIsVisible, setPasswordsIsVisibles] = React.useState({ password: false, confirma_password: false });

    return (
        <>
            <div className="w-full bg-primary-content py-10 rounded-lg px-10 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex-col" >
                <div className="mb-8" >
                    <h2 className="text-3xl font-bold text-center">Faça o registro com: </h2>
                </div>
                <div>
                    <button onClick={() => { signIn('discord') }} className="btn w-full" type="button">
                        <FaDiscord/> SignUp Discord
                    </button>
                </div>
                <div className="divider">OU</div>
                <Formik
                    initialValues={{
                        nome: "",
                        usuario: "",
                        email: "",
                        confirma_email: "",
                        senha: "",
                        confirma_senha: "",
                        aceito_termos_de_uso: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            const { aceito_termos_de_uso, ...data } = values;

                            if (!aceito_termos_de_uso) {
                                return null
                            }

                            const res = signIn("credentials", {
                                ...data
                            });
                            
                            const data = await fetch('http://localhost:3000/api/user', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values),
                            }).then(async (res) => { return await res.json()});
                            console.log(data);
                        } catch (error) {
                            console.error((error as Error).message)
                        }
                    }}
                >
                    {({values, handleChange, handleSubmit, errors}) => (
                        <form className="flex flex-col items-center" onSubmit={handleSubmit} action="">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Nome Completo</span>
                                </div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input onChange={handleChange('nome')} type="text" className="grow" placeholder="Nome" />
                                </label>
                                <div className="label">
                                    <span className={`label-text-alt ${errors.nome ? "text-error" : ""}`}>{errors.nome ? errors.nome : "Informe seu nome completo"}</span>
                                </div>
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Usuário</span>
                                </div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input onChange={handleChange('usuario')} type="text" className="grow" placeholder="Usuario" />
                                </label>
                                <div className="label">
                                    <span className={`label-text-alt ${errors.usuario ? "text-error" : ""}`}>{errors.usuario ? errors.usuario : "Informe seu nome completo"}</span>
                                </div>
                            </label>
                            <div className="w-full flex flex-col lg:flex-row gap-5" >
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Email</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <MdEmail/>
                                        <input onChange={handleChange('email')} type="email" className="grow" placeholder="ex: teste@teste.com" />
                                    </label>
                                    <div className="label">
                                        <span className={`label-text-alt ${errors.email ? "text-error" : ""}`}>{errors.email ? errors.email : "Informe seu nome completo"}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Confirma email</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <MdEmail/>
                                        <input onChange={handleChange('confirma_email')} type="email" className="grow" placeholder="ex: teste@teste.com" />
                                    </label>
                                    <div className="label">
                                        <span className={`label-text-alt ${errors.confirma_email ? "text-error" : ""}`}>{errors.confirma_email ? errors.confirma_email : "Informe seu nome completo"}</span>
                                    </div>
                                </label>
                            </div>
                            <div className="w-full flex flex-col lg:flex-row gap-5 " >
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Senha</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <FaKey/>
                                        <input value={values.senha} onChange={handleChange('senha')} type={passwordsIsVisible.password ? "text" : "password"} className="grow" placeholder="**************" />
                                        <button onClick={() => setPasswordsIsVisibles({...passwordsIsVisible, password: !passwordsIsVisible.password}) } type="button">
                                            {passwordsIsVisible.password ? <FaEyeSlash/> : <FaEye/>}
                                        </button>
                                    </label>
                                    <div className="label">
                                        <span className={`label-text-alt ${errors.senha ? "text-error" : ""}`}>{errors.senha ? errors.senha : "Informe seu nome completo"}</span>
                                    </div>
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Confirma Senha</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <FaKey/>
                                        <input value={values.confirma_senha} onChange={handleChange('confirma_senha')} type={passwordsIsVisible.confirma_password ? "text" : "password"} className="grow" placeholder="***********" />
                                        <button onClick={() => setPasswordsIsVisibles({...passwordsIsVisible, confirma_password: !passwordsIsVisible.confirma_password}) } type="button">
                                            {passwordsIsVisible.confirma_password ? <FaEyeSlash/> : <FaEye/>}
                                        </button>
                                    </label>
                                    <div className="label">
                                        <span className={`label-text-alt ${errors.confirma_senha ? "text-error" : ""}`}>{errors.confirma_senha ? errors.confirma_senha : "Informe seu nome completo"}</span>
                                    </div>
                                </label>
                            </div>
                            <div className="my-5 w-full">
                                <label className="flex flex-row gap-3 items-center justify-start cursor-pointer">
                                    <input type="checkbox" value={String(values.aceito_termos_de_uso)} onChange={handleChange('aceito_termos_de_uso')} className="checkbox" />
                                    <span className="label-text">Concordo com os <Link href="/termos-de-uso" target="_blank" className="link link-hover" >termos de uso</Link></span>
                                </label>
                                <div className="label">
                                    <span className={`label-text-alt ${errors.aceito_termos_de_uso ? "text-error" : ""}`}>{errors.aceito_termos_de_uso ? errors.aceito_termos_de_uso : "Para prosseguir aceite os termos de uso"}</span>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center pt-3" >
                                <button className="btn w-full"  type="submit">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default FormRegistro;