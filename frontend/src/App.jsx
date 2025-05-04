// @ts-check

import { Toolbar } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EventSearchPage from './components/EventSearchPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import AccountPage from './views/Account/AccountPage';
import ConfirmEmail from './views/Account/ConfirmEmail';
import ExternalLogin from './views/Account/ExternalLogin';
import ForgotPassword from './views/Account/ForgotPassword';
import ForgotPasswordConfirmation from './views/Account/ForgotPasswordConfirmation';
import Login from './views/Account/Login';
import Register from './views/Account/Register';
import ResetPassword from './views/Account/ResetPassword';
import ResetPasswordConfirmation from './views/Account/ResetPasswordConfirmation';
import EventDetailsPage from './views/Attendee/EventDetailsPage';
import Homepage from './views/Attendee/Homepage';
import BannerPage from './views/Organizer/CreateEvent/BannerPage';
import EditDetailsPage from './views/Organizer/CreateEvent/EditDetailsPage';
import { EventContextProvider } from './views/Organizer/CreateEvent/EventContext';
import ReviewPage from './views/Organizer/CreateEvent/ReviewPage';
import TicketingPage from './views/Organizer/CreateEvent/TicketingPage';
import EventDetail from './views/Organizer/EventDetail/EventDetail';
import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';


const App= () => {
  return (
    <AuthProvider>
      {/* Fixed header */}
      <Header />
      {/* <Toolbar /> */}
      <Toolbar />
      <div className="container" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/externallogin" element={<ExternalLogin />} />
          <Route path="/account/confirmemail" element={<ConfirmEmail />} />
          <Route path="/account/forgotpassword" element={<ForgotPassword />} />
          <Route path="/account/forgotpasswordconfirmation"
                 element={<ForgotPasswordConfirmation />} />
          <Route path="/account/resetpassword" element={<ResetPassword />} />
          <Route path="/account/resetpasswordconfirmation"
                 element={<ResetPasswordConfirmation />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/event/search" element={<EventSearchPage />} />
          <Route path="/event/details" element={<EventDetailsPage />} />
          <Route path="/event-details" element={<EventDetail />} />

          {/* Event Creation Routes with Context Provider */}
          <Route path="/create-event" element={
            <EventContextProvider>
              <EditDetailsPage />
            </EventContextProvider>
          } />
          <Route path="/banner" element={
            <EventContextProvider>
              <BannerPage />
            </EventContextProvider>
          } />
          <Route path="/ticketing" element={
            <EventContextProvider>
              <TicketingPage />
            </EventContextProvider>
          } />
          <Route path="/review" element={
            <EventContextProvider>
              <ReviewPage />
            </EventContextProvider>
          } />


          <Route path="/organizer" element={<OrganizerHomepage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/event-list" element={<EventList />} /> */}
          {/* <Route path="/event-detail" element={<EventDetail />} /> */}
          {/* <Route path="/attendance-list" element={<AttendanceList />} /> */}
          {/* <Route path="/attendance-detail-card" element={<AttendanceDetailCard />} /> */}
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
