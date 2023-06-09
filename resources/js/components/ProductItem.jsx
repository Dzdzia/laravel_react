import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { BsTrash } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { useState } from 'react';

export default function ProductItem({ product, onDelete }) {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axiosClient
                .delete(`/products/${product.id}`)
                .then(() => {
                    onDelete(product.id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const placeOrder = () => {
        axiosClient.post('/orders', {
            product_id: product.id,
            quantity: 1  // ustal odpowiednią ilość
        })
            .then(response => {
                if (response.data.success) {
                    setOrderPlaced(true);
                } else {
                    // obsłuż błąd
                }
            });
    };

    return (
        <tr>

            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.description}</td>
            <td className="border px-4 py-2">{product.price} PLN</td>
            <td className="border px-4 py-2">
                <div className="flex flex-row">
                    <div>
                        <Link
                            className="btn-edit mr-2"
                            to={`/products/${product.id}/edit`}
                        >
                            <LuEdit />
                        </Link>
                    </div>
                    <div>
                        <button
                            className="btn-delete ml-2"
                            onClick={handleDelete}
                        >
                            <BsTrash />
                        </button>
                    </div>
                    <div>
                        {orderPlaced ? (
                            <p>Zamówienie złożone!</p>
                        ) : (
                            <button onClick={placeOrder}>Złóż zamówienie</button>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}
