import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import ProductItem from "./ProductItem";
import {BsFillPlusCircleFill} from "react-icons/bs";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get("/products")
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    return (
        <div>


            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="ProductList">
                    <section>
                    {products.length > 0 ? (
                        <table className="able-fixed  border-collapse ">
                            <thead>
                            <tr>

                                <th className="px-4 py-2">Produkt</th>
                                <th className="px-4 py-2">Opis</th>
                                <th className="px-4 py-2">Cena</th>
                                <th className="px-4 py-2">Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    onDelete={handleDelete}
                                />
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No products available.</p>
                    )}
                </section>
                </div>

            )}
            <Link
                to="/products/new"
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-indigo-600"
            >
                <BsFillPlusCircleFill size={20} />
            </Link>
        </div>
    );
}
