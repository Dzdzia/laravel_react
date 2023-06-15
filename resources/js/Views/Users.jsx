import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import UserTable from "../components/UserTable";
import ProductList from "../components/ProductList";
import OrdersTable from "../components/OrdersTable.jsx";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showUserAdditionalColumns, setShowUserAdditionalColumns] = useState(false);
    const [showProductAdditionalColumns, setShowProductAdditionalColumns] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient
            .delete(`/users/${user.id}`)
            .then(() => {
                getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/users");
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserSwitchToggle = () => {
        setShowUserAdditionalColumns(!showUserAdditionalColumns);
    };

    const handleProductSwitchToggle = () => {
        setShowProductAdditionalColumns(!showProductAdditionalColumns);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center space-x-8">
                <div className="user_table p-4">
                    <h2 className="text-2xl font-bold mb-4">Lista użytkowników</h2>
                    <div className="flex justify-between mb-4">
                        <Link
                            className="btn-add inline-block px-4 py-2 text-sm font-medium text-black bg-indigo-green rounded-md hover:bg-indigo-600"
                            to="/users/new"
                        >
                            Dodaj użytkownika
                        </Link>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    className="sr-only"
                                    checked={showUserAdditionalColumns}
                                    onChange={handleUserSwitchToggle}
                                />
                                <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                                <div
                                    className={`${
                                        showUserAdditionalColumns ? "bg-indigo-600" : "bg-gray-200"
                                    } absolute inset-y-0 left-0 w-6 h-6 rounded-full transition-transform`}
                                ></div>
                            </div>
                            <div className="ml-3 text-sm text-gray-700">Pokaż dodatkowe kolumny</div>
                        </label>
                    </div>


                    <UserTable
                        users={users}
                        onDeleteClick={onDeleteClick}
                        showAdditionalColumns={showUserAdditionalColumns}
                    />
                </div>

                <div className="product_table p-4">
                    <h2 className="text-2xl font-bold mb-4">Lista produktów</h2>
                    <div className="flex justify-between mb-4">
                        <Link
                            className="btn-add inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                            to="/products/new"
                        >
                            Dodaj produkt do listy
                        </Link>
                    </div>
                    <ProductList showAdditionalColumns={showProductAdditionalColumns} onToggle={handleProductSwitchToggle} />
                </div>
            </div>

            <div className="orders_table p-4">
                <h2 className="text-2xl font-bold mb-4">Zamówienia</h2>
                <OrdersTable />
            </div>
        </div>
    );
};

export default Users;
