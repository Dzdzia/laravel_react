import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/Context";
import ProductList from "../components/ProductList";
import UserTable from "../components/UserTable";

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
        <div className="flex">
            <div className="w-1/2">
                <div className="user_table p-4">
                    <h2>Lista użytkowników</h2>
                    <div className="flex justify-between mb-4">
                        <Link className="btn-add" to="/users/new">
                            Dodaj użytkownika
                        </Link>
                    </div>
                    <UserTable users={users} onDeleteClick={onDeleteClick} />
                </div>
            </div>
            <div className="w-1/2">
                <div className="product_table p-4">
                    <h2>Lista produktów</h2>
                    <div className="flex justify-between mb-4">
                        <Link className="btn-add" to="/products/new">
                            Dodaj produkt do listy
                        </Link>
                    </div>
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default Users;
