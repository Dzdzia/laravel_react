import React from "react";
import { Link } from "react-router-dom";
import {BsFillPlusCircleFill, BsTrash} from "react-icons/bs";
import {LuEdit} from "react-icons/lu";

const UserTable = ({ users, onDeleteClick,showAdditionalColumns}) => {
    return (

        <div className="user_table">

            <section>
            <table className="table-fixed  border-collapse">
                <thead>
                <tr>
                    {showAdditionalColumns && (
                        <>
                            <th className="px-4 py-2">Id</th>
                        </>
                    )}
                    <th className="px-4 py-2">Imie</th>
                    <th className="px-4 py-2">E-mail</th>
                    <th className="px-4 py-2">Rola</th>
                    {showAdditionalColumns && (
                        <>
                            <th className="px-4 py-2">Data utworzenia</th>
                        </>
                    )}
                    <th className="px-4 py-2">Czynności</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        {showAdditionalColumns && (
                            <>
                                <td className="border px-4 py-2">{user.id}</td>
                            </>
                        )}
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.role}</td>
                        {showAdditionalColumns && (
                            <>
                                <td className="border px-4 py-2">{user.created_at}</td>
                            </>
                        )}

                        <td className="border px-4 py-2">
                            <div className="flex flex-row">
                            <div>
                            <Link className="btn-edit mr-2" to={`/users/${user.id}`}>
                                <LuEdit />
                            </Link>
                            </div>
                            <div>
                            <button className="btn-delete" onClick={() => onDeleteClick(user)}>
                                <BsTrash />
                            </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
            <Link
                to="/users/new"
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-indigo-500"
            >
                <BsFillPlusCircleFill size={20} />
            </Link>
        </div>
    );
};

export default UserTable;
