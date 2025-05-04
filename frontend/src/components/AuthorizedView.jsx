// @ts-check
import { useAuth } from "../context/AuthContext";

/**
 * @typedef {import("../context/AuthContext").AccountRole} AccountRole
 * @typedef {import("react").JSX.Element} Element
 */

/**
 * @typedef {{ [p in (AccountRole | "children")]?: Element }} AuthorizedViewElementProps
 */

/**
 * @typedef {AuthorizedViewElementProps & {role?: AccountRole}} AuthorizedViewProps
 */

/**
 * @param {AuthorizedViewProps} props
 */
export default function AuthorizedView(props) {
    const auth = useAuth();

    if (props.children && auth.user && (!props.role || props.role === auth.role)) {
        return props.children;
    }

    return props[auth.role];
}
