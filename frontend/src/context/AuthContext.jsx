// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getApiUrl } from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // on mount, try to fetch current user from server
    useEffect(() => {
        fetch(getApiUrl('Account/Me'), { credentials: 'include' })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
            if (data) {
            setUser({ role: data.role }); // assumes your API returns { role: 'attendee' }
            }
        });
    }, []);

    const login = (role) => {
        setUser({ role });
    };

    const logout = () => {
        // tell server to log out if necessary...
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
