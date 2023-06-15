import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import ProductItem from "./ProductItem";

// Usuń 'export default' tutaj
function ToggleSwitch({ isChecked, onChange, label }) {
    return (
        <div className="flex items-center mb-4">
            <label htmlFor="toggle_items" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="toggle_items"
                        className="sr-only"
                        checked={isChecked}
                        onChange={onChange}
                    />
                    <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                    <div
                        className={`${
                            isChecked ? "bg-indigo-600" : "bg-gray-200"
                        } absolute inset-y-0 left-0 w-6 h-6 rounded-full transition-transform`}
                    ></div>
                </div>
                <div className="ml-3 text-sm text-gray-700">{label}</div>
            </label>
        </div>
    );
}

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);

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

    const handleToggle = () => {
        setShowAdditionalColumns(!showAdditionalColumns);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-row justify-center space-x-8">


                <div>
                    <ToggleSwitch
                        isChecked={showAdditionalColumns}
                        onChange={handleToggle}
                        label="Pokaż dodatkowe kolumny"
                    />
                    <section>
                        {products.length > 0 ? (
                            <table className="table-fixed border-collapse ">
                                <thead>
                                <tr>
                                    {showAdditionalColumns && <th className="px-4 py-2">Id</th>}
                                    <th className="px-4 py-2">Produkt</th>
                                    <th className="px-4 py-2">Opis</th>
                                    <th className="px-4 py-2">Cena</th>
                                    {showAdditionalColumns && <th className="px-4 py-2">Ilość</th>}
                                    {showAdditionalColumns && <th className="px-4 py-2">Data utworzenia</th>}
                                    {showAdditionalColumns && <th className="px-4 py-2">Data ostatniej edycji</th>}
                                    <th className="px-4 py-2">Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <ProductItem key={product.id} product={product} onDelete={handleDelete} showAdditionalColumns={showAdditionalColumns} />
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No products available.</p>
                        )}
                    </section>
                </div>
                </div>
            )}
        </div>


    );
}
