// src/context/AuthContext.jsx
// @ts-check
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi, getApiUrl, postApi } from '../api';

/** @import Account from "../models/Account"; */

/**
 * @typedef {("guest" | "attendee" | "organizer")} AccountRole
 */

/** @interface */
export class AuthContextProvider {
    /** @type {Account | null | undefined} */
    user;
    /** @type {AccountRole} */
    role;
    /** @type {boolean} */
    isComplete;
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
    const [isAuthComplete, setIsAuthComplete] = useState(false);

    const [ searchParams, setSearchParams ] = useSearchParams();

    const toAttendeeForm = useRef(/** @type {HTMLFormElement} */ ({}));
    const toOrganizerForm = useRef(/** @type {HTMLFormElement} */ ({}));
    const logoutForm = useRef(/** @type {HTMLFormElement} */ ({}));

    const logout = useCallback(async () => {
        logoutForm.current.submit();
    }, [logoutForm]);

    const switchRole = useCallback(
        /** @param {AccountRole} desiredRole */
        async (desiredRole) => {
            let initialRole = role;

            if (desiredRole === role) {
                return;
            }
            if (desiredRole === "guest") {
                await logout();
            }

            let response = await fetchApi(`Account/${desiredRole}`);
            let hasDesiredRole = response.ok;

            // If they don't, create that profile using the API.
            if (!hasDesiredRole) {
                await postApi(`Account/${desiredRole}`);
                let response = await fetchApi(`Account/${desiredRole}`);
                if (!response.ok) {
                    return;
                }
            }

            setRole(desiredRole);

            if (initialRole !== "guest") {
                if (desiredRole === "attendee") {
                    toAttendeeForm.current.submit();
                } else if (desiredRole === "organizer") {
                    toOrganizerForm.current.submit();
                }
            }
        },
        [role, logout]);

    // on mount, try to fetch current user from server
    useEffect(() => {
        (async function() {
            // Login
            let response = await fetchApi("Account");
            if (!response.ok) {
                setRole("guest");
                setUser(null);
                setIsAuthComplete(true);
                return;
            }

            // Save current user
            /** @type {Account} */
            const data = await response.json();
            setUser(data);
            setIsAuthComplete(true);
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
            if (desiredRole === "guest") {
                for (let testRole of /** @type {AccountRole[]} */(["attendee", "organizer"])) {
                    let response = await fetchApi(`Account/${testRole}`);
                    if (response.ok) {
                        desiredRole = testRole;
                        break;
                    }
                }
                if (desiredRole === "guest") {
                    desiredRole = "attendee";
                }
            }

            switchRole(desiredRole);
        })();
    }, [user, role, searchParams, setSearchParams, switchRole]);

    return (
        <AuthContext.Provider value={{
            user: user,
            role: role,
            isComplete: isAuthComplete,
            logout: logout,
            switchRole: switchRole
        }}>
            <div style={{ display: "none" }}>
                <form
                    ref={logoutForm}
                    method="post"
                    action={getApiUrl("Account/Logout")}
                    hidden={true}
                    style={{ display: "none" }} />
                <form
                    ref={toAttendeeForm}
                    method="get"
                    action="/attendee-homepage"
                    hidden={true}
                    style={{ display: "none" }}>
                        <input name="role" value="attendee" readOnly={true} />
                </form>
                <form
                    ref={toOrganizerForm}
                    method="get"
                    action="/organizer-homepage"
                    hidden={true}
                    style={{ display: "none" }}>
                        <input name="role" value="organizer" readOnly={true} />
                </form>
            </div>

            {children}
        </AuthContext.Provider>
    );
}
