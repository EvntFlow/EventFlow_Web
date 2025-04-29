import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React from 'react';
import { getApiUrl } from '../api';

const SocialLoginCard = (
/** @type {{ action: string, provider: string, isPersistent: bool, returnUrl: ?string }} */
{
    icon,
    action,
    provider,
    isPersistent,
    returnUrl
}) => {

  const buttonUrl = getApiUrl("Account/ExternalLogin", {
    "provider": provider,
    "isPersistent": isPersistent,
    "referrer": window.location.origin,
    "returnUrl": returnUrl
  });

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        width: "100%",
        margin: '0 auto',
      }}
    >
      <CardActionArea href={buttonUrl}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            gap: 2,
          }}
        >
          {/* Application Icon */}
          <Box
            component={icon}
            alt={`${provider} icon`}
            sx={{ width: 24, height: 24 }}
          />
          {/* Login Text */}
          <Typography variant="body1" fontWeight="bold">
            {action} with {provider}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default SocialLoginCard;
