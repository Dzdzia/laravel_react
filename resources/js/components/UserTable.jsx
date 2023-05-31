import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ users, onDeleteClick }) => {
    return (
        <div className="user_table">
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
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="border px-4 py-2">{user.id}</td>
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.created_at}</td>
                        <td className="border px-4 py-2">{user.role}</td>
                        <td className="border px-4 py-2">
                            <Link className="btn-edit mr-2" to={`/users/${user.id}`}>
                                Edytuj
                            </Link>
                            <button className="btn-delete" onClick={() => onDeleteClick(user)}>
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link
                to="/users/new"
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
                Create New User
            </Link>
        </div>
    );
};

export default UserTable;
