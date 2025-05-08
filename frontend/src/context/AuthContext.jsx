// src/context/AuthContext.jsx
// @ts-check
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi, getApiUrl, postApi } from '../api';

/**
 * @import Account from "../models/Account";
 * @import Attendee from "../models/Attendee";
 * @import Organizer from "../models/Organizer";
 */

/**
 * @typedef {("guest" | "attendee" | "organizer")} AccountRole
 */

/**
 * @typedef BaseAuthContextProvider
 * @property {Account | null | undefined} user
 * @property {boolean} isComplete
 * @property {() => Promise<void>} logout
 * @property {(r: AccountRole, i?: boolean) => Promise<void>} switchRole
 */

/**
 * @typedef { BaseAuthContextProvider & {
 *  role: "guest"
 * }} GuestAuthContextProvider
*/

/**
 * @typedef { BaseAuthContextProvider & {
 *  role: "attendee"
 *  attendee: Attendee
 * }} AttendeeAuthContextProvider
 */

/**
 * @typedef { BaseAuthContextProvider & {
 *  role: "organizer",
 *  organizer: Organizer
 * }} OrganizerAuthContextProvider
 */

/**
 * @typedef { GuestAuthContextProvider
 *  | AttendeeAuthContextProvider
 *  | OrganizerAuthContextProvider
 * } AuthContextProvider
 */

const AuthContext = createContext(/** @type {AuthContextProvider} */ ({}));
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(/** @type {Account | null} */(null));
    const [role, setRole] = useState(/** @type {AccountRole} */("guest"));
    const [organizer, setOrganizer] = useState(/** @type {Organizer | null} */(null));
    const [isAuthComplete, setIsAuthComplete] = useState(false);

    const [ searchParams, setSearchParams ] = useSearchParams();

    const toAttendeeForm = useRef(/** @type {HTMLFormElement} */ ({}));
    const toOrganizerForm = useRef(/** @type {HTMLFormElement} */ ({}));
    const logoutForm = useRef(/** @type {HTMLFormElement} */ ({}));

    const logout = useCallback(async () => {
        logoutForm.current.submit();
    }, [logoutForm]);

    const switchRole = useCallback(
        /**
         * @param {AccountRole} desiredRole
         * @param {boolean=} inline
         */
        async (desiredRole, inline) => {
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
                response = await fetchApi(`Account/${desiredRole}`);
                if (!response.ok) {
                    return;
                }
            }

            if (desiredRole === "organizer") {
                setOrganizer(await response.json());
            } else {
                setOrganizer(null);
            }

            setRole(desiredRole);

            if (initialRole !== "guest" && !inline) {
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
        <AuthContext.Provider value={/** @type {AuthContextProvider} */({
            user: user,
            role: role,
            organizer: organizer,
            isComplete: isAuthComplete,
            logout: logout,
            switchRole: switchRole
        })}>
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
                    action="/Home/Attendee"
                    hidden={true}
                    style={{ display: "none" }}>
                        <input name="role" value="attendee" readOnly={true} />
                </form>
                <form
                    ref={toOrganizerForm}
                    method="get"
                    action="/Home/Organizer"
                    hidden={true}
                    style={{ display: "none" }}>
                        <input name="role" value="organizer" readOnly={true} />
                </form>
            </div>

            {children}
        </AuthContext.Provider>
    );
}
