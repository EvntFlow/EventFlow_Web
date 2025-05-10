// @ts-check

import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

/**
 * @import {ButtonProps} from "@mui/material";
 */

/**
 * @typedef SubmitButtonOwnProps
 * @property {string=} label
 */

/**
 * @typedef {ButtonProps & SubmitButtonOwnProps} SubmitButtonProps
 */

/**
 * @param {SubmitButtonProps} props
 */

export default function SubmitButton(props) {
  const {
    label,
    disabled, onClick, startIcon,
    ...rest
  } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Button
      disabled={isSubmitting || disabled}
      onClick={(e) => {
        const form = e.currentTarget.closest("form");
        if (form) {
          setIsSubmitting(true);
          form.requestSubmit();
        }
        onClick?.apply(this, [e]);
      }}
      startIcon={isSubmitting ? <CircularProgress size={16} /> : startIcon}
      {...rest}
    >
      {label}
    </Button>
  )
}
