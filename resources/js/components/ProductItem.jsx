import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ProductItem({ product, onDelete }) {
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

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price} PLN</td>
            <td>{product.quantity} sztuk</td>
            <td>
                <Link to={`/products/${product.id}/edit`} className="btn-edit">
                    Edit
                </Link>
                <button className="btn-delete ml-2" onClick={handleDelete}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
