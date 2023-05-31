import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

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
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]); // Dodano id jako zależność

    const fetchProduct = () => {
        setLoading(true);
        axiosClient
            .get(`/products/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setFormData({
                    id: data.id,
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || 0,
                    quantity: data.quantity || 0,
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .put(`/products/${id}`, formData)
            .then(() => {
                console.log("Product updated successfully");
                navigate("/users");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="btn bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Update
                        </button>
                        <button
                            className="btn bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={() => navigate("/users")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
