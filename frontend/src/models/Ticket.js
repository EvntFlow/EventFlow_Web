/**
 * @import Attendee from "./Attendee";
 * @import Event from "./Event";
 * @import TicketOption from "./TicketOption";
 */

export default class Ticket {
    /** @type {string} */
    id;
    /** @type {Attendee} */
    attendee;
    /** @type {Event | null=} */
    event;
    /** @type {TicketOption} */
    ticketOption;
    /** @type {number} */
    price;
    /** @type {boolean} */
    isReviewed;
    /** @type {string} */
    holderFullName;
    /** @type {string} */
    holderEmail;
    /** @type {string} */
    holderPhoneNumber;
}
