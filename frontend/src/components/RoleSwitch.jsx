// @ts-check

import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RoleSwitch() {
  const { role, switchRole } = useAuth();
  const theme = useTheme();
  const [foreground, setForeground] = useState("");
  const [background, setBackground] = useState("");

  const ifRole = useCallback(
    /**
     * @template {any} T
     * @param {T} attendeeValue
     * @param {T} organizerValue
     * @returns {T}
     */
    function (attendeeValue, organizerValue) {
      switch (role) {
        case "attendee":
          return attendeeValue;
        case "organizer":
          return organizerValue;
        default:
          return /** @type {T} */(null);
      }
    }, [role]);

  useEffect(() => {
    setForeground(ifRole(theme.palette.background.default, theme.palette.text.primary));
    setBackground(ifRole(theme.palette.text.primary, theme.palette.background.default));
  }, [role, theme, ifRole])

  switch (role) {
    case "attendee":
    case "organizer":
      break;
    default:
      return null;
  }

  function CircleIcon() {
    return (
      <Box
        sx={{
          bgcolor: foreground,
          minHeight: 24,
          minWidth: 24,
          borderRadius: 10
        }} />
    )
  }

  return (
    <Box>
      <Button
        disableRipple
        onClick={(e) => { switchRole(ifRole("organizer", "attendee")) }}
        sx={{
          borderRadius: 10,
          bgcolor: background,
          color: foreground,
          textTransform: "initial",
          minWidth: 128,
          paddingLeft: ifRole(0, undefined),
          paddingRight: ifRole(undefined, 0)
        }}
        endIcon={
          ifRole(<CircleIcon />, null)
        }
        startIcon={
          ifRole(null, <CircleIcon />)
        }>
        <Typography
          sx={{
            width: "100%",
            color: foreground,
            fontWeight: theme.typography.fontWeightBold,
            margin: 0
          }}>
          {ifRole("Attendee", "Organizer")}
        </Typography>
      </Button>
    </Box>
  )
}
