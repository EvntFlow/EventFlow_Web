// @ts-check

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Grid,
    MenuItem,
    Popover,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getCategories } from '../backend';
import { useSearchParams } from 'react-router-dom';

/** @import Category from "../models/Category"; */

/**
 * @typedef SearchCardProps
 * @property {string} title
 * @property {boolean} syncSearchParams
 */

/**
 * @param {SearchCardProps} props
 */
export default function SearchCard(props) {
    const height = 15;
    const width = 80;

    const [anchorLocation, setAnchorLocation] = useState(/** @type {HTMLElement | null} */(null));
    const [anchorDate, setAnchorDate] = useState(/** @type {HTMLElement | null} */(null));
    const [anchorPrice, setAnchorPrice] = useState(/** @type {HTMLElement | null} */(null));
    const [anchorCategories, setAnchorCategories]
        = useState(/** @type {HTMLElement | null} */(null));

    const [searchParams] = useSearchParams();

    const [location, setLocation] = useState(/** @type {string[]} */([]));
    const [minDate, setMinDate] = useState(/** @type {Date | null=} */(null))
    const [maxDate, setMaxDate] = useState(/** @type {Date | null=} */(null))
    const [minPrice, setMinPrice] = useState(/** @type {number | null} */(null))
    const [maxPrice, setMaxPrice] = useState(/** @type {number | null} */(null))
    const [category, setCategory] = useState(/** @type {string[]} */([]));
    const [keywords, setKeywords] = useState("");

    const [availableCategories, setAvailableCategories] = useState(/** @type {Category[]} */([]));

    useEffect(() => {
        (async function() {
            setAvailableCategories(await getCategories());
        })();
    }, []);

    useEffect(() => {
        if (!props.syncSearchParams) {
            return;
        }

        setLocation(searchParams.getAll("location"));
        const minDate = Date.parse(searchParams.get("minDate") ?? "");
        if (!Number.isNaN(minDate)) {
            setMinDate(new Date(minDate));
        }
        const maxDate = Date.parse(searchParams.get("maxDate") ?? "");
        if (!Number.isNaN(maxDate)) {
            setMaxDate(new Date(maxDate));
        }
        const minPrice = Number.parseFloat(searchParams.get("minPrice") ?? "");
        if (!Number.isNaN(minPrice)) {
            setMinPrice(minPrice);
        }
        const maxPrice = Number.parseFloat(searchParams.get("maxPrice") ?? "");
        if (!Number.isNaN(maxPrice)) {
            setMaxPrice(maxPrice);
        }
        setCategory(searchParams.getAll("category"));
        setKeywords(searchParams.get("keywords") ?? "");
    }, [props.syncSearchParams, searchParams])

    return (
        <Card
            sx={{
                boxSizing: "border-box",
                height: `${height}rem`,
                width: `${width}%`,
                position: "absolute",
                left: `${(100 - width) / 2}%`,
                bottom: `${-height / 2}rem`,
                zIndex: 1,
                borderRadius: 8,
                padding: 4
            }}>
            <Typography variant="h4" color="primary">
                <b>{props.title}</b>
            </Typography>
            <Typography variant="h5">
                Explore exciting events happening now with EventFlow
            </Typography>

            {/* Selectors */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: 16,
                    border: 1,
                    borderColor: "text.secondary",
                    my: 2,
                    minHeight: `${height / 3}rem`,
                    px: 1
                }}>
                <Grid size={12} container={true} width="100%">
                    <Grid
                        size={2.5}
                        component="div"
                        onClick={(e) => setAnchorLocation(e.currentTarget)}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                        <PlaceOutlinedIcon fontSize="medium" sx={{ mx: 1 }} />
                        <Box width="100%" overflow="hidden">
                            <Typography color="textPrimary" align="left">
                                <b>Location</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="left"
                                textOverflow="ellipsis"
                                noWrap={true}>
                                    {(location && location.length) ?
                                        location.join(", ") :  "Add destination"}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" sx={{ mx: 1, height: "50%" }} />
                    </Grid>
                    <Grid
                        size={2}
                        component="div"
                        onClick={(e) => setAnchorDate(e.currentTarget)}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                        <CalendarMonthOutlinedIcon fontSize="medium" sx={{ mx: 1 }} />
                        <Box width="100%" overflow="hidden">
                            <Typography color="textPrimary" align="left">
                                <b>Date</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="left"
                                textOverflow="ellipsis">
                                    {(minDate || maxDate) ?
                                        [
                                            minDate ? dayjs(minDate).format("DD/MM/YYYY") : "Any",
                                            maxDate ? dayjs(maxDate).format("DD/MM/YYYY") : "Any",
                                        ].join(" - ") :
                                        "Add dates"}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" sx={{ mx: 1, height: "50%" }} />
                    </Grid>
                    <Grid
                        size={2}
                        component="div"
                        onClick={(e) => setAnchorPrice(e.currentTarget)}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                        <MonetizationOnOutlinedIcon fontSize="medium" sx={{ mx: 1 }} />
                        <Box width="100%">
                            <Typography color="textPrimary" align="left">
                                <b>Price</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="left"
                                textOverflow="ellipsis">
                                    {(minPrice != null || maxPrice != null) ?
                                        [
                                            minPrice ? `$${minPrice}` : "Any",
                                            maxPrice ? `$${maxPrice}` : "Any"
                                        ].join(" - ") :
                                        "Price range"}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" sx={{ mx: 1, height: "50%" }} />
                    </Grid>
                    <Grid
                        size={2.5}
                        component="div"
                        onClick={(e) => setAnchorCategories(e.currentTarget)}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                        <PeopleOutlineIcon fontSize="medium" sx={{ mx: 1 }} />
                        <Box width="100%" overflow="hidden">
                            <Typography color="textPrimary" align="left">
                                <b>Categories</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="left"
                                textOverflow="ellipsis"
                                noWrap={true}>
                                    {(category && category.length) ?
                                        (function() {
                                            /** @type {Map<string, string>} */
                                            const map = new Map();
                                            for (let c of availableCategories) {
                                                map.set(c.id, c.name);
                                            }
                                            return category.map(c => map.get(c)).join(", ");
                                        })() :
                                        "Add categories"}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" sx={{ mx: 1, height: "50%" }} />
                    </Grid>
                    <Grid size={2} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <TextField
                            variant="standard"
                            slotProps={{ input: { disableUnderline: true } }}
                            placeholder="Search Event Name"
                            value={keywords}
                            sx={{ mx: 1 }}
                            onChange={(e) => setKeywords(e.target.value)} />
                    </Grid>


                    <Grid size={1} sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}>

                        {/* Hidden form */}
                        <form
                            method="get"
                            action="/Event/Search">
                                {location.map(l => (
                                    <input name="location" value={l} hidden readOnly />
                                ))}
                                <input
                                    name="minDate"
                                    value={minDate?.toISOString()}
                                    hidden={true}
                                    readOnly={true} />
                                <input
                                    name="maxDate"
                                    value={maxDate?.toISOString()}
                                    hidden={true}
                                    readOnly={true} />
                                <input
                                    name="minPrice"
                                    value={minPrice || undefined}
                                    hidden={true}
                                    readOnly={true} />
                                <input
                                    name="maxPrice"
                                    value={maxPrice || undefined}
                                    hidden={true}
                                    readOnly={true} />
                                {category.map(l => (
                                    <input name="category" value={l} hidden readOnly />
                                ))}
                                <input
                                    name="keywords"
                                    value={keywords}
                                    hidden={true}
                                    readOnly={true} />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ borderRadius: 100, minWidth: 0, padding: 2 }}>
                                        <SearchOutlinedIcon />
                                </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>

            {/* Popovers */}
            <Popover
                open={!!anchorLocation}
                anchorEl={anchorLocation}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                onClose={() => setAnchorLocation(null)}>
                <Box
                    sx={{ minWidth: "40vw", p: 2 }}>
                    <Autocomplete
                        freeSolo={true}
                        multiple={true}
                        options={[]}
                        value={location}
                        onChange={(e, newValue) => {setLocation(newValue)}}
                        renderValue={(value, getItemProps) =>
                            value.map((option, index) => {
                                const { key, ...itemProps } = getItemProps({ index });
                                return (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        key={key}
                                        {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Location"
                                placeholder="Add Destinations"
                            />
                        )}
                        filterOptions={(x) => x}>
                    </Autocomplete>
                </Box>
            </Popover>

            <Popover
                open={!!anchorDate}
                anchorEl={anchorDate}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                onClose={() => setAnchorDate(null)}>
                <Box sx={{ p: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2} direction="row">
                            <DatePicker
                                disablePast
                                format="DD/MM/YYYY"
                                label="Minimum Date"
                                value={dayjs(minDate)}
                                onChange={(newValue) => setMinDate(newValue?.toDate())} />
                            <DatePicker
                                disablePast
                                format="DD/MM/YYYY"
                                label="Maximum Date"
                                value={dayjs(maxDate)}
                                onChange={(newValue) => setMaxDate(newValue?.toDate())} />
                        </Stack>
                    </LocalizationProvider>
                </Box>
            </Popover>

            <Popover
                open={!!anchorPrice}
                anchorEl={anchorPrice}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                onClose={() => setAnchorPrice(null)}>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2} direction="row">
                        <TextField
                            type="number"
                            slotProps={{ htmlInput: { step: 0.01, min: 0.00 } }}
                            label="Minimum Price"
                            value={minPrice || ''}
                            onChange={(e) =>
                                setMinPrice(e.target.value === null ?
                                    null : Number.parseFloat(e.target.value)
                            )} />
                        <TextField
                            type="number"
                            slotProps={{ htmlInput: { step: 0.01, min: 0.00 } }}
                            label="Maximum Price"
                            value={maxPrice || ''}
                            onChange={(e) =>
                                setMaxPrice(e.target.value === null ?
                                    null : Number.parseFloat(e.target.value)
                            )} />
                    </Stack>
                </Box>
            </Popover>

            <Popover
                open={!!anchorCategories}
                anchorEl={anchorCategories}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                onClose={() => setAnchorCategories(null)}>
                <Box sx={{ p: 2 }}>
                    <Select
                        multiple
                        sx={{ minWidth: "20vw" }}
                        value={category}
                        onChange={(e) => setCategory(
                            typeof e.target.value === "string" ? [e.target.value] : e.target.value
                        )} >
                            {availableCategories.map((c) => (
                                <MenuItem
                                    key={c.name}
                                    value={c.id}>
                                        {c.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Box>
            </Popover>
        </Card>
    )
}
