import React from 'react';
import Header from './components/Header';
import Homepage from './views/Attendee/Homepage';
import Login from './views/Account/Login';
import Register from './views/Account/Register';
import ExternalLogin from './views/Account/ExternalLogin';
import ConfirmEmail from './views/Account/ConfirmEmail';
import ForgotPassword from './views/Account/ForgotPassword';
import ForgotPasswordConfirmation from './views/Account/ForgotPasswordConfirmation';
import ResetPassword from './views/Account/ResetPassword';
import ResetPasswordConfirmation from './views/Account/ResetPasswordConfirmation';
import AccountPage from './views/Attendee/AccountPage';
import EventDetailsPage from './views/Attendee/EventDetailsPage';
import EventDetail from './views/Organizer/EventDetail/EventDetail';
import EventSearchPage from './components/EventSearchPage';
import { SearchContextProvider } from './components/SearchContext';

import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';

// import Dashboard from './views/Organizer/Dashboard/Dashboard';
// import AttendanceDetailCard from './views/Organizer/AttendanceList/AttendanceDetailCard';
// import AttendanceList from './views/Organizer/AttendanceList/AttendanceList';
// import EventList from './views/Organizer/Dashboard/EventList';

import { AuthProvider } from './context/AuthContext';
// ;
import { Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';


const App= () => {
    return (
        <AuthProvider>
        {/* Fixed header */}
        <Header />
        {/* <Toolbar /> */}
        <Toolbar />
        <div className="container">
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
            <Route path="/event-details-page" element={<EventDetailsPage />} />
            <Route path="/event-details" element={<EventDetail />} />
            {/* <Route path="/event-search" element={<EventSearchResult />} /> */}

            <Route path="/organizer-homepage" element={<OrganizerHomepage />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/event-list" element={<EventList />} /> */}
            {/* <Route path="/event-detail" element={<EventDetail />} /> */}
            {/* <Route path="/attendance-list" element={<AttendanceList />} /> */}
            {/* <Route path="/attendance-detail-card" element={<AttendanceDetailCard />} /> */}
            </Routes>
        </div>
        </AuthProvider>
    );
}

export default App;
