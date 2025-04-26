// src/services/api.js
import axios from 'axios';

// Get the base URL from your Swagger link
const API_BASE_URL = 'https://ishar.tail35ead.ts.net:8443/swagger'; // Your backend base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors for handling tokens automatically (useful for login/authenticated requests)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Optional: Add interceptors for handling responses (e.g., refreshing tokens, global error handling)
api.interceptors.response.use(response => {
    return response; // Pass successful responses through
}, error => {
    // Handle errors globally if needed (e.g., 401 Unauthorized redirects to login)
    if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - potentially redirecting to login.");
        // Example: Trigger logout or redirect
        // import { logout } from '../context/AuthContext'; // Be careful with circular dependencies
        // logout();
        // window.location.href = '/login';
    }
    return Promise.reject(error); // Pass errors down the chain
});


export default api;