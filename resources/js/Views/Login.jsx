import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import {useStateContext} from "../Context/Context.jsx";
import axiosClient from "../axios-client.js";

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [message, setMessage] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            })
    }


    return (
        <div className="login-register-form flex min-h-full flex-1 flex-col justify-center px-8 py-6 lg:px-8">
            <div className="image sm:mx-auto sm:w-medium sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Kebab_box"
                />
                <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Zaloguj się na swoje konto
                </h3>
            </div>

            <div className="formularz mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form onSubmit={onSubmit} className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                    shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="Twój adres E-mail"
                                    className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                    shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />


                                <input
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="Hasło"
                                    className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                    shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />


                                <button
                                    className=" pt-4 py-5 bg-indigo-500  text-black font-bold py-2 px-3 border-b
                                    rounded-full">
                                    Zaloguj się
                                </button>


                            </form>

                            <div className="message text-center flex-1 justify-center flex-col">
                                Nie jesteś zarejestrowany?{' '}
                                <Link to="/register" className="text-indigo-500 hover:text-blue-500">
                                    Zarejestruj się
                                </Link>
                            </div>
                        </div>
                    </div>

    )
}

