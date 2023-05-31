const BASE_URL = '/api/products';

export const getProducts = async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
};

export const createProduct = async (product) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    return await response.json();
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    return await response.json();
};

export const deleteProduct = async (id) => {
    return await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
};
