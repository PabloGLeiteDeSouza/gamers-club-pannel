"use client"
import { Formik } from "formik"
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa6";

const FormRegistro: React.FC = () => {
    return (
        <div>
            <div>
                <button onClick={() => { signIn('discord', {}) }} className="btn" type="button">
                    <FaDiscord/> SignIn Discord
                </button>
            </div>
            <Formik
                initialValues={{
                    nome: "",
                    email: "",
                    confirmaEmail: "",
                    senha: "",
                    confirmarSenha: "",
                }}
                onSubmit={() => {
                    console.log("Formulário submetido");
                }}
            >
                {({values, handleChange, handleSubmit, errors}) => (
                    <form action="">

                    </form>
                )}
            </Formik>
        </div>
    )
}

export default FormRegistro;