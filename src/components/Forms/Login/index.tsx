"use client";

import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa6";

const FormLogin = () => {
  return (
    <div>
        <div>
            <h2>Acesse sua conta</h2>
        </div>
        <div>
            <button onClick={() => signIn('discord')} className="btn w-full " type="button">
                <FaDiscord/>
                Faca login com o discord
            </button>
        </div>
        <div>
            <Formik
                initialValues={{
                login: "",
                senha: "",
                }}
                onSubmit={() => {}}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, errors }) => {
                return (
                    <>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit} action="">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Login</span>
                                <span className="label-text-alt"></span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input onChange={handleChange('login')} type="text" className="grow" placeholder="login" />
                            </label>
                            <div className="label">
                                <span className={`label-text-alt ${errors.login ? "text-error" :  ""}`}>{errors.login ? errors.login : "O login e seu email ou sua senha"}</span>
                                <span className="label-text-alt"></span>
                            </div>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                            />
                        </svg>
                        <input onChange={handleChange('senha')} type="password" className="grow" value="password" />
                        </label>
                        <div className="" >
                        <button className="btn btn-primary w-full"  type="submit">Login</button>
                        </div>
                    </form>
                    </>
                );
                }}
            </Formik>
        </div>
    </div>
  );
};

export default FormLogin;
