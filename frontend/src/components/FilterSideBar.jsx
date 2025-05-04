// @ts-check

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Divider, Stack } from '@mui/material';

/** @typedef {import("../models/Event").default} Event */

/**
 * @param {Date} date
 * @param {number} days
 */
function addDay(date, days) {
  days ??= 1;
  return new Date(date.getTime() + 24 * 3600 * 1000);
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventFree(event) {
  return event.price === 0;
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventPaid(event) {
  return event.price > 0;
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventToday(event) {
  const date = new Date(Date.parse(event.startDate));
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDay(today, 1);
  return (date >= today) && (date < tomorrow);
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventTomorrow(event) {
  const date = new Date(Date.parse(event.startDate));
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDay(today, 1);
  const dayAfterTomorrow = addDay(tomorrow, 1);
  return (date >= tomorrow) && (date < dayAfterTomorrow);
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventThisWeek(event) {
  const date = new Date(Date.parse(event.startDate));
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  const thisWeek = addDay(today, -today.getDay());
  const nextWeek = addDay(thisWeek, 7);
  return (date >= thisWeek) && (date < nextWeek);
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isEventThisWeekend(event) {
  const date = new Date(Date.parse(event.startDate));
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  const thisWeek = addDay(today, -today.getDay());
  const thisSaturday = addDay(thisWeek, 6);
  const nextMonday = addDay(thisWeek, 8);
  return (date >= thisSaturday) && (date < nextMonday);
}


/**
 * @typedef FilterSidebarProps
 * @property {Event[]} data
 * @property {(newData: Event[]) => void} onFilter
 */

/**
 * @param {FilterSidebarProps} props
 */
export default function FilterSidebar({data, onFilter}) {
  const [isFree, setIsFree] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [isThisWeek, setIsThisWeek] = useState(false);
  const [isThisWeekend, setIsThisWeekend] = useState(false);

  const [selectedLocations, setSelectedLocations]
    = useState(/** @type {Set<string>} */(new Set()));

  useEffect(() => {
    const shouldFilterPrice = isFree || isPaid;
    const shouldFilterDate = isToday || isTomorrow || isThisWeek || isThisWeekend;

    const filtered = data.filter((event) => {
      let ok = true;
      if (shouldFilterPrice) {
        ok = ok && ((isFree && isEventFree(event)) || (isPaid && isEventPaid(event)));
      }
      if (shouldFilterDate) {
        ok = ok && ((isToday && isEventToday(event)) || (isTomorrow && isEventTomorrow(event))
                    || (isThisWeek && isEventThisWeek(event))
                    || (isThisWeekend && isEventThisWeekend(event)));
      }
      if (selectedLocations.size) {
        ok = ok && selectedLocations.has(event.location);
      }
      return ok;
    });

    onFilter?.apply(null, [filtered]);
  }, [data, onFilter, isFree, isPaid, isToday, isTomorrow, isThisWeek, isThisWeekend, selectedLocations]);

  const handleLocationChange = useCallback(
    /**
     * @param {string} key
     * @param {boolean} state
     */
    function(key, state) {
      if (state === selectedLocations.has(key)) {
        return;
      }
      if (state === true) {
        selectedLocations.add(key);
      } else {
        selectedLocations.delete(key);
      }
      setSelectedLocations(new Set(selectedLocations));
    }
  , [selectedLocations]);

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        boxSizing: 'border-box',
        p: 2,
        top: 0,
        left: 0,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" my={1} mb={4}>Filters</Typography>

      <Typography variant="h6" my={1}>Price</Typography>
      <Stack>
        <FormControlLabel label="Free" control={
            <Checkbox checked={isFree} onChange={(e) => setIsFree(e.target.checked)} /> }/>
        <FormControlLabel label="Paid" control={
            <Checkbox checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} /> }/>
      </Stack>
      <Divider sx={{ my: 2, mx: 2 }}/>

      <Typography variant="h6" m={1}>Date</Typography>
      <Stack>
        <FormControlLabel label="Today" control={
            <Checkbox checked={isToday} onChange={(e) => setIsToday(e.target.checked)} /> }/>
        <FormControlLabel label="Tomorrow" control={
            <Checkbox checked={isTomorrow} onChange={(e) => setIsTomorrow(e.target.checked)} /> }/>
        <FormControlLabel label="This Week" control={
            <Checkbox checked={isThisWeek} onChange={(e) => setIsThisWeek(e.target.checked)} /> }/>
        <FormControlLabel label="This Weekend" control={
            <Checkbox
              checked={isThisWeekend}
              onChange={(e) => setIsThisWeekend(e.target.checked)} /> }/>
      </Stack>
      <Divider sx={{ my: 2, mx: 2 }}/>

      <Typography variant="h6" my={1}>Location</Typography>
      <Stack>
          {[...new Set(data.map(e => e.location))].sort().map((l) => (
            <FormControlLabel key={l} label={l} control={
              <Checkbox
                value={l}
                onChange={(e) => handleLocationChange(e.target.value, e.target.checked)} /> } />
          ))}
      </Stack>
      <Divider sx={{ my: 2, mx: 2 }}/>

    </Box>
  );
};
