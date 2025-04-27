// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import api from '../services/api'; // Import the api helper

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Initialize user state from localStorage if available
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    // register function - THIS MAKES THE API CALL
    async function register(data) {
        // The data object here will contain { email, password } from your Register component
        console.log("Attempting to register with data:", data);
        // Use the 'api' object to post to the backend endpoint
        // Based on your Swagger link and convention, the endpoint is likely /api/Account/Register
        await api.post('/api/Account/Register', data);
        console.log("Registration request sent successfully.");
        // After successful registration, you might want to auto-login
        // or simply let the user navigate to the login page (as your Register component does).
    }

    // login function (implement similarly if needed)
    async function login(credentials) {
        try {
            const { data } = await api.post('/api/Account/Login', credentials);
            // Assume API returns { token, user: { ... } } upon successful login
            localStorage.setItem('token', data.token); // Store the JWT
            localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
            setUser(data.user); // Update context state
            // Maybe navigate the user somewhere after login
        } catch (error) {
            console.error("Login failed:", error);
            // Rethrow or handle error display
            throw error;
        }
    }

    // logout function
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        // Maybe navigate the user to the login page
    }

    // (optional) switch role function
    function toggleRole() {
        if (!user || !user.canSwitch) return; // Add a check if user or canSwitch exists

        // This is a frontend-only toggle in this example.
        // A real implementation might need an API call.
        const newRole = user.role === 'attendee' ? 'organizer' : 'attendee';
        const updated = { ...user, role: newRole };
        localStorage.setItem('user', JSON.stringify(updated)); // Update local storage
        setUser(updated); // Update context state
    }

    // Provide the functions and user state through the context
    return (
        <AuthContext.Provider value={{ user, register, login, logout, toggleRole }}>
            {children}
        </AuthContext.Provider>
    );
}

// Optional: Custom hook for easier context consumption
// import { useContext } from 'react';
// export const useAuth = () => useContext(AuthContext);