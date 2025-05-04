// @ts-check

import React, { useEffect, useState } from 'react';
import EventSection from './EventSection';
import { Box, Grid } from '@mui/material';
import SortByDropdown from './SortByBox';
import FilterSidebar from './FilterSideBar';
import { useSearchParams } from 'react-router-dom';
import { findEvents } from '../backend';
import SearchCard from './Search';

/** @typedef {import("../models/Event").default} Event */
/** @typedef {import("../backend").FindEventParams} FindEventParams */
/** @typedef {import("../components/SortByBox").SortOption} SortOption */

const EventSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState(/** @type {Event[] | null=} */(null));
  const [filteredEvents, setFilteredEvents] = useState(/** @type {Event[] | null=} */(null));
  const [sortBy, setSortBy] = useState(/** @type {SortOption} */("relevance"));

  useEffect(() => {
    (async function() {
      /** @type {FindEventParams} */
      let params = {}

      params.category = searchParams.getAll("category");
      params.minDate = searchParams.get("minDate") ?? undefined;
      params.maxDate = searchParams.get("maxDate") ?? undefined;
      params.minPrice = searchParams.get("minPrice") ?? undefined;
      params.maxPrice = searchParams.get("maxPrice") ?? undefined;
      params.location = searchParams.getAll("location");
      params.keywords = searchParams.get("keywords") ?? undefined;

      setEvents(await findEvents(params));
    })();
  }, [searchParams]);

  return (
    <div>
      <Box sx={{ position: "relative", height: "7.5rem", mb: "7.5rem" }}>
        <SearchCard title="Let's get started!" syncSearchParams={true} />
      </Box>
      <Box sx={{ height: "1rem" }} />
      <Grid size={12} container={true}>
        <Grid size={2}>
          <FilterSidebar data={events} onFilter={setFilteredEvents} />
        </Grid>
        <Grid size={10}>
          {/* Main content area */}
          <Box sx={{ flexGrow: 1, width: "100%", p: 4, boxSizing: "border-box" }}>
            {/* Main Content */}
            <SortByDropdown onChange={setSortBy} />
            <EventSection
              events={filteredEvents?.sort((e1, e2) => {
                switch (sortBy) {
                  case "date":
                    const startDiff
                      = new Date(e1.startDate).getTime() - new Date(e2.startDate).getTime();
                    return startDiff !== 0 ? startDiff :
                      new Date(e1.endDate).getTime() - new Date(e2.endDate).getTime();
                  case "price":
                    return e1.price - e2.price;
                  default:
                    return e1.id.localeCompare(e2.id);
                }
              })}
              rowSize={3} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default EventSearchPage;
