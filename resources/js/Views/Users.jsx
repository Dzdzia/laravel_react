import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/Context.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Lista użytkowników</h1>
                <Link className="btn-add" to="/users/new">Dodaj użytkownika</Link>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <div className="user_table p-4">
                        <table className="table-fixed w-full border-collapse">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Imie</th>
                                <th className="px-4 py-2">E-mail</th>
                                <th className="px-4 py-2">Data utworzenia</th>
                                <th className="px-4 py-2">Rola</th>
                                <th className="px-4 py-2">Czynności</th>
                            </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td className="border px-4 py-2">{u.id}</td>
                                        <td className="border px-4 py-2">{u.name}</td>
                                        <td className="border px-4 py-2">{u.email}</td>
                                        <td className="border px-4 py-2">{u.created_at}</td>
                                        <td className="border px-4 py-2">{u.role}</td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                className="btn-edit mr-2"
                                                to={'/users/' + u.id}
                                            >
                                                Edytuj
                                            </Link>
                                            <button
                                                className="btn-delete"
                                                onClick={ev => onDeleteClick(u)}
                                            >
                                                Usun
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="product_table p-4"></div>
                </div>
            </div>
        </div>

    )
}
