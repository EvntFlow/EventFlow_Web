// @ts-check

import React, { useCallback, useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, Button, IconButton,
  Paper
} from '@mui/material';
import { Close, Add, Remove, KeyboardArrowRight } from '@mui/icons-material';
import AttendeeDetailsForm from './AttendeeDetailsForm';
import { useSearchParams } from 'react-router-dom';

/**
 * @import Event from "../models/Event";
 * @import TicketOption from "../models/TicketOption";
 */

/**
 * @typedef TicketOverlayProps
 * @property {boolean} isOpen
 * @property {Event} event
 * @property {() => any} onClose
 * @property {() => any} onCheckout
 */

/**
 * @param {TicketOverlayProps} props
 */
export default function TicketOverlay(props) {
  const KEY_TICKET_OPTION = "ticketOption";

  const [showAttendeeForm, setShowAttendeeForm] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(/** @type {Map<string, number>} */(new Map()));
  const [availableOptions, setAvailableOptions]
    = useState(/** @type {Map<string, TicketOption>} */(new Map()));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setAvailableOptions(new Map(props.event.ticketOptions?.map(to => [to.id, to])));
  }, [props.event]);

  useEffect(() => {
    /** @type {Map<string, number>}> */
    const newQuantity = new Map();
    const ticketOptions = searchParams.getAll(KEY_TICKET_OPTION);
    for (let to of ticketOptions) {
      if (!availableOptions.has(to)) {
        continue;
      }
      newQuantity.set(to, (newQuantity.get(to) ?? 0) + 1);
    }
    setQuantity(newQuantity);
  }, [availableOptions, searchParams])

  useEffect(() => {
    if (searchParams.has(KEY_TICKET_OPTION) && searchParams.has("error")) {
      setShowAttendeeForm(true);
    }
  }, [searchParams]);

  const updateQuantity = useCallback(
    /**
     * @param {string} id
     * @param {number} change
     */
    function (id, change) {
      quantity.set(id, Math.max(0, (quantity.get(id) ?? 0) + change));
      searchParams.delete(KEY_TICKET_OPTION);
      for (const [to, count] of quantity) {
        for (let i = 0; i < count; ++i) {
          searchParams.append(KEY_TICKET_OPTION, to);
        }
      }
      setSearchParams(searchParams);
    },
    [quantity, searchParams, setSearchParams]);

  useEffect(() => {
    setTotalQuantity(
      [...quantity]
        .filter(([to, _]) => availableOptions.has(to))
        .reduce((sum, [_, count]) => sum + count, 0)
    );
    setTotalPrice(
      [...quantity]
        .map(([to, _]) => availableOptions.get(to))
        .filter(to => !!to)
        .reduce((sum, to) => sum + props.event.price + to.additionalPrice, 0)
    )
  }, [props.event, availableOptions, quantity]);

  const formatPrice = useCallback(
    /**
     * @param {TicketOption} to
     */
    function (to) {
      const price = props.event.price + to.additionalPrice;
      if (!price) {
        return "Free"
      } else {
        return `$${price.toFixed(2)}`;
      }
    }
    , [props.event])

  const handleProceed = () => {
    if (totalQuantity > 0) {
      setShowAttendeeForm(true);
    }
  };

  return (
    <>
      <Dialog
        open={props.isOpen && !showAttendeeForm}
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Select Tickets
          <IconButton onClick={props.onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" color="text.secondary">Ticket Types</Typography>
            <Typography variant="subtitle2" color="text.secondary">Quantity</Typography>
          </Box>

          {props.event.ticketOptions
            ?.sort((to1, to2) => to1.additionalPrice - to2.additionalPrice)
            .map((to) =>
          (
            <Paper
              key={to.id}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: to.additionalPrice ? 'primary.50' : 'warning.50',
                borderLeft: 4,
                borderColor: to.additionalPrice ? 'primary.main' : 'warning.main'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1">{to.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatPrice(to)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => updateQuantity(to.id, -1)}
                    size="small"
                    sx={{ bgcolor: 'grey.200' }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity.get(to.id) ?? 0}</Typography>
                  <IconButton
                    onClick={() => updateQuantity(to.id, 1)}
                    size="small"
                    sx={{ bgcolor: 'grey.200' }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </DialogContent>
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Qty: {totalQuantity}</Typography>
            <Typography>
              Total:{' '}
                <Box component="span" color="primary.main">
                  {totalPrice ? `$${totalPrice.toFixed(2)}` : "Free"}
                </Box>
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProceed}
            disabled={totalQuantity === 0}
            endIcon={<KeyboardArrowRight />}
          >
            Proceed
          </Button>
        </Box>
      </Dialog>

      <AttendeeDetailsForm
        isOpen={showAttendeeForm}
        onClose={() => setShowAttendeeForm(false)}
        onContinue={() => {}}
        event={props.event}
        ticketDetails={[...quantity]
          .map(([id, count]) =>
            /** @type {[TicketOption, number]} */([availableOptions.get(id), count]))
          .filter(([to, _]) => !!to)
          .sort(([to1, _1], [to2, _2]) => to1.additionalPrice - to2.additionalPrice)
        }
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </>
  );
};
