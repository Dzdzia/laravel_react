import React, { useEffect, useState } from 'react';
import axiosClient from "../axios-client";

function OrdersTable() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/orders");
            setOrders(response.data.data);
        } catch (error) {
            console.log(error);
            setError("Wystąpił błąd podczas pobierania zamówień.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Trwa ładowanie zamówień...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        console.log(orders),
        <table>
            <thead>
            <tr>
                <th className="px-4 py-2">Id_zamówienia</th>
                <th className="px-4 py-2">Użytkownik</th>
                <th className="px-4 py-2">Produkt</th>
                <th className="px-4 py-2">Ilość</th>
                <th className="px-4 py-2">Data zamówienia</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border px-4 py-2">{order.id}</td>
                        <td className="border px-4 py-2">{order.user_name}</td>
                        <td className="border px-4 py-2">{order.product_name}</td>
                        <td className="border px-4 py-2">{order.quantity}</td>
                        <td className="border px-4 py-2">{order.date_ordered}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5">Brak zamówień</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default OrdersTable;
