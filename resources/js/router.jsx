import { createBrowserRouter, Navigate, Route } from "react-router-dom";

import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Register from "./views/Register.jsx";
import Users from "./Views/Users.jsx";
import UserForm from "./views/UserForm";
import UserLayout from "./components/UserLayout.jsx";
import ProductList from "./components/ProductList";
import NewProductForm from "./components/NewProductForm";
import EditProductForm from "./components/EditProductForm";
import OrdersTable from "@/components/OrdersTable.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
            {
                path: "/products",
                element: <ProductList />,
            },
            {
                path: "/products/new",
                element: <NewProductForm key="newProductCreate" />,
            },
            {
                path: "/products/:id/edit",
                element: <EditProductForm />,
            },
            {
                path: "/products/:id/edit",
                element: <EditProductForm />,
            },
            {
                path: "/orders",
                element: <OrdersTable/>,
            },
            {
                path: "/orders/:id",
                element: <OrdersTable/>,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
