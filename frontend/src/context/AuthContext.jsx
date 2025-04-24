// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    // register
    async function register(data) {
        await api.post('/api/Account/Register', data);
        // you might auto‐login or navigate to login page
    }

    // login
    async function login(credentials) {
        const { data } = await api.post('/api/Account/Login', credentials);
        // assume API returns { token, user: { ... } }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    }

    // logout
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    // (optional) switch role
    function toggleRole() {
        const newRole = user.role === 'attendee' ? 'organizer' : 'attendee';
        const updated = { ...user, role: newRole };
        localStorage.setItem('user', JSON.stringify(updated));
        setUser(updated);
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout, toggleRole }}>
        {children}
        </AuthContext.Provider>
    );
}
