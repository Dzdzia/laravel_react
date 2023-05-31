import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Context/Context.jsx";

export default function GuestLayout() {
    const {token} = useStateContext()
    if (token) {
        return <Navigate to="/users"/>
    }

    return (
        <div id="guestLayout" className="min-h-screen flex flex-col bg-gray-100">
            <div className="content flex-grow">
                <header className="py-5 px-8 white shadow-xl flex justify-center space-x-4">
                    <Link to="/login" className="text-xl text-black-800 hover:text-blue-700 px-6">Login</Link>
                    <Link to="/register" className="text-xl text-black-800 hover:text-blue-700 px-6">Register</Link>
                </header>
                <main className="p-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
