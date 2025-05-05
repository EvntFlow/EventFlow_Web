// @ts-check

/** @import Category from "./Category"; */
/** @import Organizer from "./Organizer"; */
/** @import SavedEvent from "./SavedEvent"; */
/** @import TicketOption from "./TicketOption"; */

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
