import React, { useEffect, useState } from 'react';
import axiosClient from "../axios-client";

function LoadingSpinner() {
    return <div>Trwa ładowanie zamówień...</div>;
}

function ErrorDisplay({ error }) {
    return <div>{error}</div>;
}

function OrderRow({ order }) {
    return (
        <tr key={order.id}>
            <td className="border sm:max-w-sm-6 py-2">{order.id}</td>
            <td className="border px-4 py-2">{order.user_name}</td>
            <td className="border px-4 py-2">{order.product_name}</td>
            <td className="border px-4 py-2">{order.quantity}</td>
            <td className="border px-4 py-2">{order.date_ordered}</td>
        </tr>
    );
}

function EmptyOrderRow() {
    return (
        <tr>
            <td colSpan="5">Brak zamówień</td>
        </tr>
    );
}

function OrdersTable() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 5; // Liczba elementów na stronę.

    useEffect(() => {
        getOrders();
    }, [page]);

    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/orders?page=${page}&limit=${limit}`);
            setOrders(response.data.data);
            setTotalPages(response.data.meta.last_page);
        } catch (error) {
            console.log(error);
            setError("Wystąpił błąd podczas pobierania zamówień.");
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr>
                        <th className="sm:max-w-sm-6 py-2">Id_zamówienia</th>
                        <th className="px-4 py-2">Użytkownik</th>
                        <th className="px-4 py-2">Produkt</th>
                        <th className="px-4 py-2">Ilość</th>
                        <th className="px-4 py-2">Data zamówienia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order) => <OrderRow key={order.id} order={order} />)
                    ) : (
                        <EmptyOrderRow />
                    )}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={handlePreviousPage} disabled={page <= 1}>
                    Poprzednia strona
                </button>
                <button onClick={handleNextPage} disabled={page >= totalPages}>
                    Następna strona
                </button>
            </div>
        </>
    );
}

export default OrdersTable;
