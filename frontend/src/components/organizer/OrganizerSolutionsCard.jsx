// @ts-check

import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button, Stack
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Categories from '../Categories';

const OrganizerSolutionCard = () => {
  return (
    <>
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Explore solutions for events of all kinds
          </Typography>

          <Categories />

          <Stack alignItems="center">
            <Button
              href="/Event/Create"
              variant="outlined"
              style={{ borderRadius: 25 }}
              endIcon={ <ArrowForward /> }
              size="large"
            >
              See all
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default OrganizerSolutionCard;
