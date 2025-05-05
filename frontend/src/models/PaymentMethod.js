// @ts-check

/**
 * @typedef BasePaymentMethod
 * @property {""} $type
 * @property {string} id
 * @property {string} displayName
 */

/**
 * @typedef {{
 *  [P in Exclude<keyof BasePaymentMethod, "$type">]: BasePaymentMethod[P];
 * } & {
 *  $type: "CardPaymentMethod";
 *  number: string;
 * }} CardPaymentMethod
 */

/**
 * @typedef {BasePaymentMethod | CardPaymentMethod} PaymentMethod
 */

/**
 * @typedef {CardPaymentMethod["$type"]} T
 */

export default {};
