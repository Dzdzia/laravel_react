import { useState } from "react";
import axiosClient from "../axios-client";
import { useHistory } from "react-router-dom";

export default function ProductForm({ onCreate, onUpdate, product = null }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || 0,
        quantity: product?.quantity || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            axiosClient
                .put(`/products/${product.id}`, formData)
                .then(({ data }) => {
                    onUpdate(data);
                    history.push("/users");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axiosClient
                .post("/products", formData)
                .then(({ data }) => {
                    onCreate(data);
                    history.push("/users");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                type="text"
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
                {product ? "Update" : "Create"}
            </button>
        </form>
    );
}
