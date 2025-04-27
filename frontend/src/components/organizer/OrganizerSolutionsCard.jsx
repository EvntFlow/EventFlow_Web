import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';

const OrganizerSolutionCard = () => {
    return (
        <>
        <Card sx={{ p: 4 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom
                    sx={{ 
                        textAlign: 'center', // centers the title
                        fontWeight: 'bold'   // makes the title bold
                }}
                style={{marginBottom: "30px"}}
                >
                    Explore solutions for events of all kind
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/* Replace these placeholder icons or images with your own */}
                    <Grid item xs={12} sm={6} md={2} style={{marginRight:"50px"}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Music"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Music</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2} style={{marginRight:"40px"}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Nightlife"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Nightlife</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Performing"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Performing</Typography>
                        </Box>
                    </Grid>

                    {/* Add more items as needed */}
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop:"35px"}}>
                    {/* Replace these placeholder icons or images with your own */}
                    <Grid item xs={12} sm={6} md={2} style={{marginRight:"50px"}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Music"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Music</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2} style={{marginRight:"40px"}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Nightlife"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Nightlife</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2} style={{marginRight:"25px"}}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Performing"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Performing</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                            src="/img/CategoryIcon.png"
                            alt="Performing"
                            style={{ width: 60, height: 60 }}
                            />
                            <Typography>Performing</Typography>
                        </Box>
                    </Grid>

                    {/* Add more items as needed */}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button variant="outlined" style={{ borderRadius: "25px", paddingLeft: "30px", paddingRight: "25px", marginTop: "15px" }}>See all &#8594;</Button>
                </Box>
            </CardContent>
        </Card>
    </>
    );
};

export default OrganizerSolutionCard;
