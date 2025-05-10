// @ts-check

import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Authorized from '../../components/Authorized';
import PaymentMethodsView from '../../components/PaymentMethodsView';

/**
 * @typedef {import('@mui/material').TextFieldProps & {label: string}} EntryProps
*/

/**
 * @param {EntryProps} props
 */
const Entry = (props) => {
  const field = useRef(/** @type {HTMLInputElement | null} */(null));
  const [changed, setChanged] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (!changed) {
      setHasValue(!!props.defaultValue);
    }
  }, [changed, props]);

  return (
    <>
      <Grid size={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography align="right" width="100%" >
          <b>{props.label}:</b>
        </Typography>
      </Grid>
      <Grid size={10}>
        <TextField
          ref={field}
          variant="outlined"
          fullWidth
          placeholder={`Enter ${props.label.toLowerCase()}`}
          {...props}
          slotProps={{
            inputLabel: {
              shrink: hasValue
            }
          }}
          onChange={(e) => {
            setChanged(true);
            setHasValue(!!e.target.value);
            props.onChange?.call(e, e);
          }} />
      </Grid>
    </>
  )
}

const AccountPage = () => {
  const [value, setValue] = useState(0);
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const error = searchParams.get("error");

  useEffect(() => {
    const index = Number.parseInt(searchParams.get("index") ?? "");
    if (Number.isNaN(index)) {
      setValue(0);
    } else {
      setValue(index);
    }
  }, [searchParams]);

  return (
    <Grid container={true}>
      <Authorized />

      <Grid size={2}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={(e, newValue) => {
            setSearchParams((prev) => { prev.set("index", newValue); return prev; })
          }}>
          <Typography variant="h5" align="center" sx={{ my: 5 }}>
            <b>Account Settings</b>
          </Typography>
          <Tab
            label="Account Info"
            value={0}
            sx={{
              justifyContent: "flex-start",
              flexDirection: "row"
            }} />
          <Tab
            label="Password"
            value={1}
            sx={{
              justifyContent: "flex-start",
              flexDirection: "row"
            }} />
          <Tab
            label="Payment Methods"
            value={2}
            sx={{
              justifyContent: "flex-start",
              flexDirection: "row"
            }} />
        </Tabs>
      </Grid>

      {/* Account Info */}
      <Grid size={9} hidden={value !== 0}>
        <Typography variant="h4" align="left" sx={{ m: 5, mb: 0 }}>
          <b>Account Information</b>
        </Typography>

        <Divider sx={{ m: 1 }} />

        <Typography variant="h5" align="left" sx={{ m: 2 }}>
          <b>Profile Information</b>
        </Typography>

        <Box
          component="form"
          method="post"
          action={`${getApiUrl("Account", { "returnUrl": window.location.href })
            }`}
          sx={{ m: 2 }} >

          <Grid container={true} spacing={2}>
            <Entry label="First Name" name="firstName" defaultValue={user?.firstName} />
            <Entry label="Last Name" name="lastName" defaultValue={user?.lastName} />
            <Entry
              label="Website"
              name="website"
              type="url"
              defaultValue={user?.website} />
            <Entry label="Company" name="company" defaultValue={user?.company} />
          </Grid>

          <Divider sx={{ m: 2 }} />

          <Typography variant="h5" align="left" sx={{ m: 2 }}>
            <b>Contact Details</b>
          </Typography>

          <Grid container={true} spacing={2}>
            <Entry
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              defaultValue={user?.phoneNumber} />
            <Entry
              label="Address Line 1"
              name="address1"
              defaultValue={user?.address1} />
            <Entry
              label="Address Line 2"
              name="address2"
              defaultValue={user?.address2} />
            <Entry label="City/Town" name="city" defaultValue={user?.city} />
            <Entry label="Country" name="country" defaultValue={user?.country} />
            <Entry
              label="Postcode"
              name="postcode"
              type="number"
              defaultValue={user?.postcode} />
          </Grid>

          {error && (
            <Alert
              severity="error"
              sx={{ m: 2 }} >
              {error}
            </Alert>
          )}

          <Box
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ m: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Password */}
      <Grid size={9} hidden={value !== 1}>
        <Typography variant="h4" align="left" sx={{ m: 5, mb: 0 }}>
          <b>Change Password</b>
        </Typography>

        <Divider sx={{ m: 1 }} />

        <Box
          component="form"
          method="post"
          action={getApiUrl("Account/ChangePassword", { "returnUrl": window.location.href })}
          sx={{ m: 2 }} >

          <Grid container={true} spacing={2}>
            <Entry
              label="Current Password"
              type="password"
              name="oldPassword"
              required={true} />
            <Entry
              label="New Password"
              type="password"
              name="newPassword"
              required={true}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Entry
              label="Confirm Password"
              type="password"
              required={true}
              onChange={(e) => e.target.value === newPassword ?
                e.target.setCustomValidity("") :
                e.target.setCustomValidity("Passwords do not match.")
              } />
          </Grid>

          {error && (
            <Alert
              severity="error"
              sx={{ m: 2 }} >
              {error}
            </Alert>
          )}

          <Box
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ m: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Payment Methods */}
      <Grid size={9} hidden={value !== 2}>
        <Typography variant="h4" align="left" sx={{ m: 5, mb: 0 }}>
          <b>Payment Methods</b>
        </Typography>

        <Divider sx={{ m: 1 }} />

        <Box sx={{ m: 2 }}>
          <PaymentMethodsView selectedPaymentMethod="" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AccountPage;
