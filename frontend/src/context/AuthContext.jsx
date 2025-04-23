// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

// mock “fetchUser” just for illustration
async function fetchUser() {
    const token = localStorage.getItem('jwt');
    if (!token) return null;
    // call your API…
    return { 
        name: 'Binh Nguyen', 
        role: 'attendee',      // or 'organizer'
        canSwitch: true        // set to false if they only ever have a single view
    };
}

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser().then(setUser);
    }, []);

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
    };

    const toggleRole = () => {
        // if your back‑end supports role switching, call that here
        setUser(u => ({
        ...u,
        role: u.role === 'attendee' ? 'organizer' : 'attendee'
        }));
    };

    return (
        <AuthContext.Provider value={{ user, logout, toggleRole }}>
        {children}
        </AuthContext.Provider>
    );
}
