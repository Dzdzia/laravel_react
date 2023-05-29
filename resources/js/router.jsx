import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "./Views/Home.jsx";
import Login from "./Views/Login.jsx";
import Register from "./Views/Register.jsx";
import Admin from "./Views/Admin.jsx";
import NotFound from "./Views/NotFound.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import UserLayout from "./components/UserLayout.jsx";


const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<GuestLayout/>,
            children:[
                {
                    path: '/login',
                    element:<Login/>
                },
                {
                    path: '/register',
                    element:<Register/>
                },
                {
                    path: '/',
                    element:<Navigate to="/login"/>
                },
            ]
        },
        {
          path:'/',
          element:<UserLayout/>,
            children:[
                {
                    path: '/admin',
                    element:<Admin/>
                },
                {
                    path: '/home',
                    element:<Home />
                },
                {
                    path: '/',
                    element:<Navigate to="/home"/>
                },

            ]
        },
        {
            path: "*",
            element:<NotFound/>
        }


    ]
)

export default router;
