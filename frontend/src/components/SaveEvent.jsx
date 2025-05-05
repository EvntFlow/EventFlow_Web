// @ts-check

import { Star, StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { unsaveEvent, saveEvent } from "../backend";
import AuthorizedView from "./AuthorizedView";

/** @import Event from "../models/Event"; */

/**
 * @typedef SaveEventProps
 * @property {Event} event
 * @property {import("@mui/material").IconButtonProps=} iconButtonProps
 */

/**
 * @param {SaveEventProps} props
 */
export default function SaveEvent({ event, iconButtonProps }) {
  const [isSaved, setIsSaved] = useState(!!event.savedEvent);
  useEffect(() => {
    setIsSaved(!!event.savedEvent);
  }, [event]);

  const handleSaveEvent = useCallback(async () => {
    if (!isSaved) {
      let savedEvent = await saveEvent(event.id);
      if (savedEvent) {
        event.savedEvent = savedEvent;
        setIsSaved(true);
      }
    } else if (event.savedEvent) {
      let ok = await unsaveEvent(event.savedEvent.id);
      if (ok) {
        event.savedEvent = undefined;
        setIsSaved(false);
      }
    }
  }, [isSaved, event]);

  return (
    <AuthorizedView role="attendee">
      <IconButton
        {...iconButtonProps}
        onClick={() => handleSaveEvent()}>
        {isSaved ? (
          <Star />
        ) : (
          <StarBorder />
        )}
      </IconButton>
    </AuthorizedView>
  )
}
