import {Link, Navigate, Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {useStateContext} from "../Context/Context.jsx";


export default function UserLayout() {
      const{user,token}= useStateContext()

    if (!token){
        return <Navigate to="/login"/>

    }
    const onLogout=(ev)=>{
    ev.preventDefault()

    }


    return (
        <div id="userLayout" className="min-h-screen flex flex-col bg-gray-100">
                <div className="content flex-grow">
                            <header className="py-5 px-8 white shadow-xl flex justify-center space-x-4">

                                <Link to="/admin" className="text-xl text-black-800 hover:text-blue-700 px-6">Admin</Link>
                                <Link to="/home" className="text-xl text-black-800 hover:text-blue-700 px-6">Home</Link>
                                      <div>
                                        {user.name}
                                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                                     </div>
                            </header>

                            <main className="p-8">
                                <Outlet />
                            </main>
                </div>
        </div>


    )
}
