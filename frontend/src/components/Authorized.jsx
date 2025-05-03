// @ts-check

import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

/**
 * @typedef AuthorizeProps
 * @property {import("../context/AuthContext").AccountRole=} role
 */

/**
 * @param {AuthorizeProps} props
 */
export default function Authorized({role}) {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isComplete) {
            // The page is still signing the user in.
            // Don't try to redirect here, or we'll end up in an infinite loop.
            return;
        }

        if (role === "guest") {
            return;
        }

        if (auth.user === null) {
            const here = new URL(window.location.href);
            if (role) {
                here.searchParams.set("role", role);
            }

            const target = new URL("/Account/Login", window.location.href);
            target.searchParams.set("returnUrl", here.toString());
            target.searchParams.set("error", "Please sign in to continue.");

            window.location.href = target.toString();
        } else if (role && auth.role !== role) {
            auth.switchRole(role);
        }
    }, [auth, role]);

    return (
        <></>
    )
}
