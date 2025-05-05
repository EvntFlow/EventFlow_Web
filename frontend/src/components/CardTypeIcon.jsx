// @ts-check

import React, { useEffect, useState } from "react";
import creditCardType from  "credit-card-type"
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

/**
 * @import { PaymentTypeExtended as CardIconTypes } from "react-svg-credit-card-payment-icons";
 * @import { SVGProps } from "react";
 */

/**
 * @typedef {typeof creditCardType.types} CardTypesRecord
 * @typedef {CardTypesRecord[keyof CardTypesRecord]} CardTypes
 */

/**
 * @typedef CardTypeIconProps
 * @property {string} number
 * @property {SVGProps<SVGSVGElement>=} iconProps
 */

/**
 * @param {CardTypeIconProps} props
 * @returns
 */
export default function CardTypeIcon(props) {

  const [iconType, setIconType] = useState(/** @type {CardIconTypes} */(""));

  useEffect(() => {
    const normalizedNumber = props.number.replaceAll(/\D/g, "");

    const type = /** @type {CardTypes=} */(creditCardType(normalizedNumber)[0]?.type);

    /** @type {Record<CardTypes, CardIconTypes>} */
    let map = {
      "american-express": "Amex",
      "diners-club": "Diners",
      "discover": "Discover",
      "elo": "Elo",
      "hiper": "Hiper",
      "hipercard": "Hipercard",
      "jcb": "Jcb",
      "maestro": "Maestro",
      "mastercard": "Mastercard",
      "mir": "Mir",
      "unionpay": "Unionpay",
      "visa": "Visa"
    };

    setIconType(type ? map[type] ?? "Generic" : "Generic");
  }, [props.number]);

  return (
    <PaymentIcon {...props.iconProps} type={iconType} format="logo" />
  );
}
