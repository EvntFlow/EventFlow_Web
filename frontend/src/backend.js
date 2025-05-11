// @ts-check

import { deleteApi, fetchApi, putApi } from "./api";

/**
 * @import Category from "./models/Category";
 * @import Event from "./models/Event";
 * @import Notification from "./models/Notification";
 * @import SavedEvent from "./models/SavedEvent";
 * @import { PaymentMethod } from "./models/PaymentMethod";
 * @import Statistics from "./models/Statistics";
 * @import Ticket from "./models/Ticket";
*/

/**
 * @returns {Promise<Category[]>}
 */
export async function getCategories() {
    const response = await fetchApi("Event/Category");
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}

/**
 * @returns {Promise<Notification[]>}
 */
export async function getNotifications() {
    const response = await fetchApi("Notification");
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}

/**
 * @typedef FindEventParams
 * @property {string[]=} category
 * @property {string=} minDate
 * @property {string=} maxDate
 * @property {string=} minPrice
 * @property {string=} maxPrice
 * @property {string[]=} location
 * @property {string=} keywords
 */

/**
 * @param {FindEventParams} params
 * @returns {Promise<Event[]>}
 */
export async function findEvents(params) {
    const searchParams = new URLSearchParams();
    if (params.category) {
        for (let c of params.category) {
            searchParams.append("category", c);
        }
    }
    if (params.minDate) {
        searchParams.append("minDate", params.minDate);
    }
    if (params.maxDate) {
        searchParams.append("maxDate", params.maxDate);
    }
    if (params.minPrice) {
        searchParams.append("minPrice", params.minPrice);
    }
    if (params.maxPrice) {
        searchParams.append("maxPrice", params.maxPrice);
    }
    if (params.location) {
        for (let c of params.location) {
            searchParams.append("location", c);
        }
    }
    if (params.keywords) {
        searchParams.append("keywords", params.keywords);
    }
    let response = await fetchApi("Event/FindEvents", searchParams);
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}

/**
 * @param {string} eventId
 * @returns {Promise<Event | null>}
 */
export async function getEvent(eventId) {
    let response = await fetchApi("Event", { event: eventId });
    if (!response.ok) {
        return null;
    }
    return await response.json();
}

/**
 * @returns {Promise<Event[]>}
 */
export async function getEvents() {
    let response = await fetchApi("Event");
    if (!response.ok) {
        return [];
    }
    return await response.json();
}

/**
 * @param {string} eventId
 * @returns {Promise<SavedEvent | null>}
 */
export async function saveEvent(eventId) {
    let response = await putApi("Event/Saved", {}, JSON.stringify(eventId));
    if (!response.ok) {
        return null;
    } else {
        return await response.json();
    }
}

/**
 * @param {string} savedEventId
 * @returns {Promise<boolean>}
 */
export async function unsaveEvent(savedEventId) {
    let response = await deleteApi("Event/Saved", { savedEvent: savedEventId });
    return response.ok;
}

/**
 * @returns {Promise<Ticket[]>}
 */
export async function getTickets() {
    let response = await fetchApi("Ticket");
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}

/**
 * @param {string=} eventId
 * @returns {Promise<Ticket[]>}
 */
export async function getAttendance(eventId) {
    let response = await fetchApi("Ticket/GetAttendance", eventId ? { event: eventId } : undefined);
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}

/**
 * @param {Date=} month
 * @returns {Promise<Statistics | null>}
 */
export async function getStatistics(month) {
    let response =
        await fetchApi("Ticket/Statistics", month ? { month: month.toISOString() } : undefined);
    if (!response.ok) {
        return {
            totalEvents: 0,
            totalTickets: 0,
            totalSales: 0,
            totalReviewed: 0,
            dailySales: []
        }
    }
    return await response.json();
}

/**
 * @returns {Promise<PaymentMethod[]>}
 */
export async function getPaymentMethods() {
    let response = await fetchApi("Payment");
    if (!response.ok) {
        return [];
    } else {
        return await response.json();
    }
}
