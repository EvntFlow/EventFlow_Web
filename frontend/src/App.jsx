import React from 'react';
import Header from './components/Header';
import Homepage from './views/Homepage/Homepage';
// import EventDetailsPage from './views/EventExploration/EventDetailsPage';
import Login from './views/LoginRegistration/Login';
import Register from './views/LoginRegistration/Register';
import AccountPage from './views/Attendees/AccountPage';

import { AuthProvider } from './context/AuthContext';
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
    <AuthProvider>
      {/* Fixed header */}
      <Header />
      {/* <Toolbar /> */}
      <Toolbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Account/Login" element={<Login />} />
          <Route path="/Account/Register" element={<Register />} />
          <Route path="/Account" element={<AccountPage />} />

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
    </AuthProvider>
  );
}

export default App;