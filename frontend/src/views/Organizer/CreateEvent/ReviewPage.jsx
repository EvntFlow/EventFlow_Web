import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Typography, 
    Box, 
    Button, 
    Paper, 
    Alert,
    Container,
    Stack,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublishIcon from '@mui/icons-material/Publish';
import { EventContext } from './EventContext';
import EventDetail from '../EventDetail/EventDetail';
import Stepper from '../../../components/Stepper';
import { getApiUrl } from '../../../api';

const ReviewPage = () => {
    const navigate = useNavigate();
    const { eventData, clearEventData } = useContext(EventContext);

    console.log("Event Data:", eventData);

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [published, setPublished] = React.useState(false);

    // Get the returnUri if needed
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl") || "/events";
    const successParam = urlParams.get("success");

    useEffect(() => {
        if (successParam === "true") {
            setPublished(true);
            clearEventData(); // Clear localStorage on successful publish
            
            // Redirect to dashboard after a delay
            const timer = setTimeout(() => {
                navigate('/organizer-homepage');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [successParam, clearEventData, navigate]);

    const handleBack = () => {
        navigate('/ticketing');
    };

    const handleSubmitButtonClick = () => {
        setIsSubmitting(true);
        // This will trigger the form submission
        document.getElementById('event-form').submit();
    };

    // Handle form submit errors
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const errorMsg = urlParams.get("error");
        if (errorMsg) {
            setError(errorMsg);
            setIsSubmitting(false);
        }
    }, []);

    return (
        <Container maxWidth="md">
        {published ? (
            <Alert severity="success" sx={{ my: 4 }}>
            Event successfully published! Redirecting to dashboard...
            </Alert>
        ) : (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }} fontWeight="700">
                REVIEW
            </Typography>
            
            <Stepper currentStep={3} />
            <Paper 
            elevation={2} 
            sx={{ 
                mb: 4, 
                p: 0, 
                overflow: 'hidden',
                borderRadius: 2
            }}
            >
                <EventDetail eventData={eventData} />
            </Paper>

            {error && (
                <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {/* Hidden Form that follows the backend requirements */}
            <Box 
            component="form"
            id="event-form"
            method="post"
            encType="multipart/form-data"
            action={getApiUrl("Event", { returnUrl: returnUrl })}
            sx={{ display: 'none' }}
            >
                {/* Basic event fields */}
                <input type="text" name="name" value={eventData.name || ''} readOnly />
                <input type="text" name="location" value={eventData.location || ''} readOnly />
                <input type="text" name="description" value={eventData.description || ''} readOnly />
                <input type="text" name="startDate" value={eventData.startDate || ''} readOnly />
                <input type="text" name="endDate" value={eventData.endDate || ''} readOnly />
                <input type="number" name="price" value={parseFloat(eventData.price || 0)} readOnly />
                
                {/* Banner */}
                {eventData.bannerUri && (
                    <input type="text" name="bannerUri" value={eventData.bannerUri || ''} readOnly />
                )}
                
                {/* Categories (array) */}
                {eventData.categories && eventData.categories.map((category, index) => (
                    <input 
                    key={`category-${index}`} 
                    type="text" 
                    name="category" 
                    value={category} 
                    readOnly 
                    />
                ))}
                
                {/* Tickets (array items) */}
                {eventData.tickets && eventData.tickets.map((ticket, index) => (
                    <React.Fragment key={`ticket-${index}`}>
                    <input 
                        type="text" 
                        name="ticketName" 
                        value={ticket.name} 
                        readOnly 
                    />
                    <input 
                        type="number" 
                        name="ticketPrice" 
                        value={parseFloat(ticket.price)} 
                        readOnly 
                    />
                    <input 
                        type="number" 
                        name="ticketCount" 
                        value={parseInt(ticket.quantity)} 
                        readOnly 
                    />
                    </React.Fragment>
                ))}
            </Box>

            <Stack 
            direction="row" 
            justifyContent="space-between"
            spacing={2}
            >
                <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isSubmitting}
                startIcon={<ArrowBackIcon />}
                sx={{ px: 3 }}
                >
                    Go back
                </Button>
                
                <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitButtonClick}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <PublishIcon />}
                sx={{ px: 3 }}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish'}
                </Button>
            </Stack>
        </Box>
        )}
        </Container>
    );
};

export default ReviewPage;