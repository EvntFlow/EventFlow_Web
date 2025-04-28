const API_BASE = process.env.NODE_ENV === "development" ?
    "https://ishar.tail35ead.ts.net:8443/api/" : "/api/"

/**
 * @param {String} path
 * @param {URLSearchParams | undefined} query
 * @returns {String}
 */
export function getApiUrl(path, query) {
    let base = new URL(API_BASE, window.location.href);
    let url = new URL(path, base);

    if (query && !(query instanceof URLSearchParams)) {
        query = new URLSearchParams(query);
    }

    query?.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    if (!url.searchParams.has("returnUrl")) {
        url.searchParams.append("returnUrl", "/");
    }

    return url.toString();
}
