import React from 'react';
import Header from './components/Header';
import Homepage from './views/Homepage/Homepage';
// import EventDetailsPage from './views/EventExploration/EventDetailsPage';
import LoginRegistrationHome from './views/LoginRegistration/LoginRegistrationHome';
import AccountPage from './views/Attendees/AccountPage';
// import EventSearchResult from './views/EventExploration/EventSearchResult';
// import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';
// import Dashboard from './views/Organizer/Dashboard/Dashboard';
// import AttendanceDetailCard from './views/Organizer/AttendanceList/AttendanceDetailCard';
// import AttendanceList from './views/Organizer/AttendanceList/AttendanceList';
// import EventList from './views/Organizer/Dashboard/EventList';
// import EventDetail from './views/Organizer/EventDetail/EventDetail';

import { Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const App= () => {
  return (
    <div>
      {/* Fixed header */}
      <Header />
      <Toolbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login-registration" element={<LoginRegistrationHome />} />
          <Route path="/account" element={<AccountPage />} />

          {/* <Route path="/event-details" element={<EventDetailsPage />} /> */}
          {/* <Route path="/event-search" element={<EventSearchResult />} /> */}
          
          {/* <Route path="/organizer-homepage" element={<OrganizerHomepage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/event-list" element={<EventList />} /> */}
          {/* <Route path="/event-detail" element={<EventDetail />} /> */}
          {/* <Route path="/attendance-list" element={<AttendanceList />} /> */}
          {/* <Route path="/attendance-detail-card" element={<AttendanceDetailCard />} /> */}
        </Routes>
      </div>
      {/* Main Content */}    
      {/* <Homepage/> */}
      {/* <EventDetailsPage/> */}
      {/* <EventSearchResult/> */}
      {/* <LoginRegistrationHome/> */}
      {/* <OrganizerHomepage/> */}
      {/* <Dashboard/> */}
      {/* <EventList/> */}
      {/* <EventDetail/> */}
      {/* <AttendanceList/> */}
      {/* <AttendanceDetailCard/> */}
      
      {/* <AttendeeDetailsForm/> */}
    </div>
  );
}

export default App;