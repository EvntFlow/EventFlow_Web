import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {AccessTime, CalendarMonth, ConfirmationNumber, LocationOn, FullscreenOutlined, AddOutlined, RemoveOutlined} from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhotoIcon from '@mui/icons-material/Photo';
import dayjs from 'dayjs';

function EventDetail({ eventData = {}, showEditButtons = true}) {
    const startDate = eventData.startDate ? dayjs(eventData.startDate) : null;
    const endDate = eventData.endDate ? dayjs(eventData.endDate) : null;
    return (
        <Box sx={{ p: 3 }}>
            {/* Event Image */}
            <Paper sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, bgcolor: '#f0f0f0' }}>
                {eventData.bannerUri ? (
                    <Box
                    component="img"
                    src={eventData.bannerUri}
                    alt={eventData.name || "Event banner"}
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => {
                        e.target.src = "/img/TopEvent.png";
                    }}
                    />
                ) : (
                    <PhotoIcon sx={{ fontSize: 80, color: 'grey.400' }} />
                )}
            </Paper>

            {/* Event Title */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">{eventData.name || "EVENT TITLE"}</Typography>
                {showEditButtons && (
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                )}
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* Date and Time */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">Date and Time</Typography>
                        {showEditButtons && (
                            <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarMonth sx={{ mr: 1 }} />
                        <Typography>
                            {startDate ? startDate.format("ddd, MMM D, YYYY") : "Day, Date"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography>
                            {startDate && endDate
                            ? `${startDate.format("h:mm A")} - ${endDate.format("h:mm A")}`
                            : "Time"}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2 }} />

            {/* Location */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Location
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1 }} />
                    <Typography>{eventData.location || "Address"}</Typography>
                </Box>
                <Paper 
                sx={{ 
                    height: 160, 
                    position: 'relative', 
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <Box sx={{ color: 'error.main' }}>
                        <LocationOn sx={{ fontSize: 40 }} />
                    </Box>
                    {showEditButtons && (
                        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                            <Paper elevation={1} sx={{ mb: 1, p: 0.5 }}>
                                <FullscreenOutlined fontSize="small" />
                            </Paper>
                            <Paper elevation={1} sx={{ mb: 1, p: 0.5 }}>
                                <AddOutlined fontSize="small" />
                            </Paper>
                            <Paper elevation={1} sx={{ p: 0.5 }}>
                                <RemoveOutlined fontSize="small" />
                            </Paper>
                        </Box>
                    )}
                </Paper>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* Ticket Information */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight={'bold'}>Ticket Information</Typography>
                    {showEditButtons && (
                        <IconButton aria-label="edit" size="small" sx={{ ml: 1 }}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ConfirmationNumber sx={{ mr: 1 }} />
                    {eventData.isTicketed === false ? (
                        <Typography>Free Event</Typography>
                    ) : (
                        <Typography>
                            {eventData.ticketName || "Ticket"}: ${eventData.ticketPrice || "0"} / Quantity
                            {eventData.ticketCount && ` (${eventData.ticketCount} available)`}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* Event Description */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Event Description
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {eventData.description || 
                    `Event description goes here.`}
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* Categor`ies as Tags */}
            {eventData.category && (
                <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Categories
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label={eventData.category} size="small" />
                </Box>
                </Box>
            )}
        </Box>
    );
}

export default EventDetail;