// @ts-check

import React from "react";
import { Box } from "@mui/material";

/**
 * @import { BoxProps } from "@mui/material";
 */

/**
 * @typedef GoogleMapsFrameOwnProps
 * @property {string} query
 */

/** @typedef {BoxProps<"iframe"> & GoogleMapsFrameOwnProps} GoogleMapsFrameProps */

/**
 * @param {GoogleMapsFrameProps} props
 */

export default function GoogleMapsFrame(props) {
  const {
    query,
    component, border, referrerPolicy, src, allowFullScreen,
    ...rest
  } = props;

  return (
    <Box
      component="iframe"
      border={0}
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }&q=${encodeURIComponent(query)}`
      }
      allowFullScreen={true}
      {...rest}
    />
  )
}
