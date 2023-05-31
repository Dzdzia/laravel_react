import React, { createContext, useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from './productApi';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const addProduct = async (product) => {
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
    };

    const updateProduct = async (id, product) => {
        const updatedProduct = await updateProduct(id, product);
        setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
    };

    const removeProduct = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
