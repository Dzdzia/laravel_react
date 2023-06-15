import React, {createRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../Context/Context.jsx";


export default function Register() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const{setUser,setToken}=useStateContext()
    const [errors, setErrors] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const validateEmail = email => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const onSubmit = ev => {
        ev.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value;

        let errors = {};
        if (!name) errors.name = "Imie nie moze byc puste";
        if (!email) errors.email = "Email nie może byc pusty";
        if (!validateEmail(email)) errors.email = "Nie prawidłowy adres email";
        if (!password) errors.password = "Hasło nie może byc puste";
        if (password !== passwordConfirmation) errors.passwordConfirmation = "Hasła nie są takie same";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const payload = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        axiosClient.post('/register', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            });
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
                    Zarejestruj się na naszej stronie
                </h3>
            </div>

            <div className="formularz mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                    shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }

                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Imie"
                        className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}

                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Twój adres E-mail"
                        className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}

                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Hasło"
                        className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}

                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Podaj hasło jeszcze raz"
                        className="flex flex-col justify-center w-full rounded-md  py-1.5 text-gray-900
                shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {validationErrors.passwordConfirmation && <p className="error-message">{validationErrors.passwordConfirmation}</p>}

                    <button
                        className=" pt-4 py-5 bg-blue   text-black font-bold py-2 px-3 border-b
                                rounded-full">
                        Zarejestruj się
                    </button>

                </form>
            </div>
            <div className=" mt-20 text-center justify-center ">
                Jesteś już zarejestrowany?{' '}
                <Link to="/login" className="text-indigo-500 hover:text-indigo-700">
                    Zaloguj się
                </Link>
            </div>
        </div>
    );
}
