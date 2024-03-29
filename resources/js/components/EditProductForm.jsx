import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function LoadingSpinner() {
    return <p>Loading...</p>;
}

function ProductForm({ formData, handleChange, handleSubmit }) {
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
                    placeholder="Nazwa produktu"
                    className="border border-gray-300 px-4 py-2 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="description" className="font-bold">
                    Opis
                </label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Opis produktu"
                    className="border border-gray-300 px-4 py-2 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="price" className="font-bold">
                    Cena
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Cena"
                    className="border border-gray-300 px-4 py-2 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="quantity" className="font-bold">
                    Ilosc
                </label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Ilość"
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

export default function EditProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/products/${id}`);
            const data = response.data;

            setFormData({
                id: data.id,
                name: data.name || "",
                description: data.description || "",
                price: data.price || 0,
                quantity: data.quantity || 0,
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
            await axiosClient.put(`/products/${id}`, formData);
            console.log("Product updated successfully");
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
                <ProductForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
