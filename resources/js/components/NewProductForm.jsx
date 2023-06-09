import React, { useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export default function NewProductForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post("/products", formData)
            .then(({ data }) => {
                console.log("Product created:", data);
                navigate("/users"); // Przekierowanie do ścieżki "/users" po utworzeniu produktu
            })
            .catch((error) => {
                console.log(error);
                // Możesz dodać obsługę błędów tutaj
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border border-gray-300 px-4 py-2 rounded"
            />
            <input
                type="string"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border border-gray-300 px-4 py-2 rounded"
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border border-gray-300 px-4 py-2 rounded"
            />
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border border-gray-300 px-4 py-2 rounded"
            />
            <button
                type="submit"
                className="btn bg-blue-500 text-black py-2 px-4 rounded"
            >
                Create
            </button>
        </form>
    );
}
