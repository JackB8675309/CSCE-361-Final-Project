// src/services/api.js
// ĐỂ ĐỒNG ĐỘI BACKEND: Chỉ cần đổi API_URL thành URL server của bạn
const API_URL = 'http://localhost:8080';

// ==================== AUTH ====================
export const login = (email, password) =>
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(r => r.json());

export const register = (email, password) =>
    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(r => r.json());

// ==================== PRODUCTS ====================
export const getProducts = () =>
    fetch(`${API_URL}/products`).then(r => r.json());

export const getProductById = (productID) =>
    fetch(`${API_URL}/products/${productID}`).then(r => r.json());

export const getProductsByCategory = (categoryID) =>
    fetch(`${API_URL}/products?category=${categoryID}`).then(r => r.json());

export const searchProducts = (query) =>
    fetch(`${API_URL}/products?search=${query}`).then(r => r.json());

// ==================== CART ====================
export const getCart = (userID) =>
    fetch(`${API_URL}/cart/${userID}`).then(r => r.json());

export const addToCart = (userID, productID, quantity) =>
    fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, productID, quantity })
    }).then(r => r.json());

export const removeFromCart = (cartID) =>
    fetch(`${API_URL}/cart/${cartID}`, { method: 'DELETE' }).then(r => r.json());

// ==================== SALES ====================
export const getSales = () =>
    fetch(`${API_URL}/sales`).then(r => r.json());

// ==================== ORDERS ====================
export const placeOrder = (userID, shippingDetails) =>
    fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, shippingDetails })
    }).then(r => r.json());