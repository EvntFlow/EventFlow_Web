// src/context/AuthContext.jsx
// @ts-check
import React, { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import { fetchApi, getApiUrl } from '../api';
import { useSearchParams } from 'react-router-dom';

/** @interface */
export class Account {
    /** @type {string} */
    id;
    /** @type {string} */
    email;
}

/**
 * @typedef {("guest" | "attendee" | "organizer")} AccountRole
 */

/** @interface */
export class AuthContextProvider {
    /** @type {Account | null | undefined} */
    user;
    /** @type {AccountRole} */
    role;
    /** @type {() => Promise<void>} */
    logout;
    /** @type {(r: AccountRole) => Promise<void>} */
    switchRole;
}

const AuthContext = createContext(/** @type {AuthContextProvider} */ ({}));
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(/** @type {Account | null} */(null));
    const [role, setRole] = useState(/** @type {AccountRole} */("guest"));

    const [ searchParams, setSearchParams ] = useSearchParams();

    const createProfileForm = useRef(/** @type {HTMLFormElement} */ ({}));
    const logoutForm = useRef(/** @type {HTMLFormElement} */ ({}));

    const logout = useCallback(async () => {
        logoutForm.current.submit();
    }, [logoutForm]);

    const switchRole = useCallback(
        /** @param {AccountRole} desiredRole */
        async (desiredRole) => {
            if (desiredRole === role) {
                return;
            }
            if (desiredRole === "guest") {
                await logout();
            }

            setRole(desiredRole);
            searchParams.set("role", desiredRole);
            setSearchParams(searchParams);
        },
        [role, logout, searchParams, setSearchParams]);

    // on mount, try to fetch current user from server
    useEffect(() => {
        (async function() {
            // Login
            let response = await fetchApi("Account");
            if (!response.ok) {
                setRole("guest");
                setUser(null);
                return;
            }

            // Save current user
            /** @type {Account} */
            const data = await response.json();
            setUser(data);
        })();
    }, []);

    useEffect(() => {
        (async function() {
            // The APIs below only work when there is a valid user.
            if (!user) {
                return;
            }

            // Resolve desired role from stored context or query string
            /** @type {AccountRole} */
            let desiredRole = role;
            if (desiredRole === "guest") {
                /** @type {AccountRole} */
                const queryRole = /** @type {AccountRole} */(searchParams.get("role"));
                switch (queryRole) {
                    case "attendee":
                    case "organizer":
                        desiredRole = queryRole;
                    break;
                    default:
                    break;
                }
            }

            // Check if the user has the desired role
            /** @type {boolean} */
            let hasDesiredRole = false;
            if (desiredRole !== "guest") {
                let response = await fetchApi(`Account/${desiredRole}`);
                if (response.ok) {
                    hasDesiredRole = true;
                }
            } else {
                for (let testRole of /** @type {AccountRole[]} */(["attendee", "organizer"])) {
                    let response = await fetchApi(`Account/${testRole}`);
                    if (response.ok) {
                        desiredRole = testRole;
                        hasDesiredRole = true;
                        break;
                    }
                }
                if (desiredRole === "guest") {
                    desiredRole = "attendee";
                }
            }

            if (desiredRole !== role) {
                switchRole(desiredRole);
            }

            // If they don't, create that profile using the API.
            if (!hasDesiredRole) {
                if (role === desiredRole) {
                    // Submit the virtual form to trigger a POST.
                    createProfileForm.current.submit();
                }
            }
        })();
    }, [user, role, searchParams, setSearchParams, switchRole]);

    return (
        <AuthContext.Provider value={{
            user: user, role: role, logout: logout, switchRole: switchRole
        }}>
            <div style={{ display: "none" }}>
                <form
                    ref={createProfileForm}
                    method="post"
                    action={getApiUrl(`Account/${role}`, {
                        returnUrl: (() => {
                            const url = new URL(window.location.href);
                            url.searchParams.append("role", role);
                            return url.toString();
                        })()
                    })}
                    hidden={true}
                    style={{ display: "none" }} />
                <form
                    ref={logoutForm}
                    method="post"
                    action={getApiUrl("Account/Logout")}
                    hidden={true}
                    style={{ display: "none" }} />
            </div>

            {children}
        </AuthContext.Provider>
    );
}
