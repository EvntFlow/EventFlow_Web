// @ts-check

import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function RoleSwitch() {
    const { role, switchRole } = useAuth();
    const theme = useTheme();

    switch (role) {
        case "attendee":
        case "organizer":
            break;
        default:
            return null;
    }

    /**
     * @template {any} T
     * @param {T} attendeeValue
     * @param {T} organizerValue
     * @returns {T}
     */
    function ifRole(attendeeValue, organizerValue) {
        return role === "organizer" ? organizerValue : attendeeValue;
    }

    function CircleIcon() {
        return (
            <Box
                sx={{
                    bgcolor: theme.palette.background.default,
                    minHeight: 24,
                    minWidth: 24,
                    borderRadius: 10
                }}/>
        )
    }

    return (
        <Box>
            <Button
                disableRipple
                onClick={
                    (e) => switchRole(ifRole("organizer", "attendee"))
                }
                sx={{
                    borderRadius: 10,
                    bgcolor: theme.palette.text.primary,
                    color: theme.palette.background.default,
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
                            color: theme.palette.background.default,
                            fontWeight: theme.typography.fontWeightBold,
                            margin: 0
                        }}>
                        {ifRole("Attendee", "Organizer")}
                    </Typography>
            </Button>
        </Box>
    )
}
