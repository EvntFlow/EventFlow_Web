// @ts-check

const API_BASE = env() === "development" ?
    "https://ishar.tail35ead.ts.net:8443/api/" : "/api/"

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @returns {String}
 */
export function getApiUrl(path, query) {
    const url = getApiUrlInternal(path, query);

    let returnUrl = "/";
    const returnUrlQuery = url.searchParams.get("returnUrl");

    if (returnUrlQuery) {
        const returnUrlObject = new URL(returnUrlQuery, window.location.href);
        returnUrlObject.searchParams.delete("error");
        returnUrl = returnUrlObject.toString();
    }

    url.searchParams.set("returnUrl", returnUrl);

    return url.toString();
}

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @returns {Promise<Response>}
 */
export async function fetchApi(path, query) {
    const url = getApiUrlInternal(path, query);

    const response = await fetch(url.toString(), {
        credentials: env() === "development" ? "include" : "same-origin"
    });

    return response;
}

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @param {BodyInit=} body
 * @returns {Promise<Response>}
 */
export async function postApi(path, query, body) {
    const url = getApiUrlInternal(path, query);

    const response = await fetch(url.toString(), {
        credentials: env() === "development" ? "include" : "same-origin",
        method: "post",
        redirect: "manual",
        body: body
    });

    return response;
}

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @param {BodyInit=} body
 * @returns {Promise<Response>}
 */
export async function putApi(path, query, body) {
    const url = getApiUrlInternal(path, query);

    const headers = new Headers();
    if (body) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url.toString(), {
        credentials: env() === "development" ? "include" : "same-origin",
        method: "put",
        body: body,
        headers: headers
    });

    return response;
}

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @returns {Promise<Response>}
 */
export async function deleteApi(path, query) {
    const url = getApiUrlInternal(path, query);

    const response = await fetch(url.toString(), {
        credentials: env() === "development" ? "include" : "same-origin",
        method: "delete",
    });

    return response;
}

/**
 * @param {String} path
 * @param {URLSearchParams | Record<string, any>=} query
 * @returns {URL}
 */
function getApiUrlInternal(path, query) {
    let base = new URL(API_BASE, window.location.href);
    let url = new URL(path, base);

    if (query && !(query instanceof URLSearchParams)) {
        query = new URLSearchParams(query);
    }

    query?.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    return url;
}

/**
 * @returns { "development" | "production" }
 */
function env() {
    // @ts-ignore
    return process.env.NODE_ENV;
}
