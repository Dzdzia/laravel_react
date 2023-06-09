import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/Context";
import ProductList from "../components/ProductList";
import UserTable from "../components/UserTable";
import OrdersTable from "../components/OrdersTable.jsx";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();


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
                setNotification("User was successfully deleted");
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

    return (
        <div className="flex flex-col">

                <div className="user_table p-4">
                    <h2 className="text-2xl font-bold mb-4">Lista użytkowników</h2>


                    <div className="flex justify-between mb-4">
                        <Link className="btn-add inline-block px-4 py-2 text-sm font-medium text-black bg-indigo-green rounded-md hover:bg-indigo-600" to="/users/new">
                            Dodaj użytkownika
                        </Link>

                    </div>
                    <UserTable users={users} onDeleteClick={onDeleteClick} />
                </div>


                <div className="product_table p-4">
                    <h2 className="text-2xl font-bold mb-4">Lista produktów</h2>


                    <div className="flex justify-between mb-4">
                        <Link className="btn-add inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600" to="/products/new">
                            Dodaj produkt do listy
                        </Link>

                    </div>
                    <ProductList />
                </div>
            <div className="orders_table p-4">
                <h2 className="text-2xl font-bold mb-4">Zamowienia</h2>

                <OrdersTable/>
            </div>
            </div>



    );
};

export default Users;
