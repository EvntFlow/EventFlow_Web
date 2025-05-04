// @ts-check

/** @typedef {import("./Category").default} Category */
/** @typedef {import("./Organizer").default} Organizer */
/** @typedef {import("./SavedEvent").default} SavedEvent */
/** @typedef {import("./TicketOption").default} TicketOption */

export default class Event {
    /** @type {string} */
    id;
    /** @type {Organizer} */
    organizer;
    /** @type {string} */
    name;
    /** @type {string} */
    description;
    /** @type {string} */
    startDate;
    /** @type {string} */
    endDate;
    /** @type {string=} */
    bannerUri;
    /** @type {string} */
    location;
    /** @type {number} */
    price;
    /** @type {number=} */
    interested;
    /** @type {Category[]=} */
    categories;
    /** @type {TicketOption[]=} */
    ticketOptions;
    /** @type {SavedEvent=} */
    savedEvent;
}
