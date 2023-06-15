import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function LoadingSpinner() {
    return <p>Loading...</p>;
}

function UserForm({ formData, handleChange, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">
                    Nazwa
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Imie użytkownika"
                    className="border border-gray-300 px-4 py-2 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="font-bold">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email użytkownika"
                    className="border border-gray-300 px-4 py-2 rounded"
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="btn bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Zaktualizuj
                </button>
                <button
                    className="btn bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={() => navigate("/users")}
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
}

export default function EditUserForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/users/${id}`);
            const data = response.data;

            setFormData({
                id: data.id,
                name: data.name || "",
                email: data.email || "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`/users/${id}`, formData);
            console.log("User updated successfully");
            navigate("/users");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <UserForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
