// src/services/api.js
const API_URL = 'http://localhost:8080'; // đồng đội backend chỉ cần đổi dòng này

export const getProducts = () => fetch(`${API_URL}/products`).then(r => r.json());
export const getCart = (userId) => fetch(`${API_URL}/cart/${userId}`).then(r => r.json());
export const placeOrder = (data) => fetch(`${API_URL}/orders`, { method: 'POST', body: JSON.stringify(data) });