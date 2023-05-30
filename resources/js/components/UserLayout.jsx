import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Context/Context.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";


export default function UserLayout() {
    const {user, token, setUser, setToken, notification} = useStateContext();

    if (!token){
        return <Navigate to="/login"/>

    }
    const onLogout=ev=> {
        ev.preventDefault()


        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])


    return (
        <div id="userLayout" className="min-h-screen flex flex-col bg-gray-100">
                <div className="content flex-grow">
                            <header className="py-5  white shadow-xl flex justify-center space-x-4">

                                <Link to="/admin" className="text-xl text-black-800 hover:text-blue-700 px-6">Admin</Link>
                                <Link to="/home" className="text-xl text-black-800 hover:text-blue-700 px-6">Home</Link>
                                      <div className=" text-l justify-end px-8">
                                        <a href="#" onClick={onLogout} className="btn-logout"> Wyloguj się</a>
                                     </div>
                                <div className="flex-end">{user.name}</div>
                            </header>

                            <main className="p-8">
                                <Outlet />
                            </main>
                    {notification &&
                        <div className="notification">
                            {notification}
                        </div>
                    }
                </div>
        </div>


    )
}
