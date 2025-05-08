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
import FinishTicketPaymentPage from './views/Attendee/FinishTicketPaymentPage';
import Homepage from './views/Attendee/Homepage';
import TicketPage from './views/Attendee/TicketPage';
import CreateEventPage from './views/Organizer/CreateEventPage';
import Dashboard from './views/Organizer/Dashboard/Dashboard';
import EventDetail from './views/Organizer/EventDetail/EventDetail';
import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';
import ManageEventPage from './views/Organizer/ManageEventPage';

const App = () => {
  return (
    <AuthProvider>
      {/* Fixed header */}
      <Header />
      {/* <Toolbar /> */}
      <Toolbar />
      <div className="container" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Home/Attendee" element={<Homepage />} />
          <Route path="/Account/Login" element={<Login />} />
          <Route path="/Account/Register" element={<Register />} />
          <Route path="/Account/ExternalLogin" element={<ExternalLogin />} />
          <Route path="/Account/ConfirmEmail" element={<ConfirmEmail />} />
          <Route path="/Account/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Account/ForgotPasswordConfirmation"
            element={<ForgotPasswordConfirmation />} />
          <Route path="/Account/ResetPassword" element={<ResetPassword />} />
          <Route path="/Account/ResetPasswordConfirmation"
            element={<ResetPasswordConfirmation />} />
          <Route path="/Account" element={<AccountPage />} />

          <Route path="/Event/Details" element={<EventDetailsPage />} />
          <Route path="/Event/Search" element={<EventSearchPage />} />

          <Route path="/Ticket/FinishTicketPayment" element={<FinishTicketPaymentPage />} />
          <Route path="/Ticket" element={<TicketPage />} />

          <Route path="/event-details" element={<EventDetail eventData={null} />} />

          <Route path="/Home/Organizer" element={ <OrganizerHomepage /> } />

          <Route path="/Event/Create" element={ <CreateEventPage /> } />
          <Route path="/Event/Manage" element={ <ManageEventPage /> } />

          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/organizer-homepage" element={<OrganizerHomepage />} />
            <Route path="/create-event" element={<TicketingPage />} /> */}
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
