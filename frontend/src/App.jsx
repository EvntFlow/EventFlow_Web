import React from 'react';
import Header from './components/Header';
import Homepage from './views/Homepage/Homepage';
import Login from './views/LoginRegistration/Login';
import Register from './views/LoginRegistration/Register';
import AccountPage from './views/Attendees/AccountPage';
import EventDetailsPage from './views/EventExploration/EventDetailsPage';
import EventDetail from './views/Organizer/EventDetail/EventDetail';
// import EventSearchPage from './EventSearchPage';

// import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';
// import Dashboard from './views/Organizer/Dashboard/Dashboard';
// import AttendanceDetailCard from './views/Organizer/AttendanceList/AttendanceDetailCard';
// import AttendanceList from './views/Organizer/AttendanceList/AttendanceList';
// import EventList from './views/Organizer/Dashboard/EventList';

// import { AuthProvider } from './context/AuthContext'
// ;
import { Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const App= () => {
  return (
    <div>
      {/* Fixed header */}
      <Header />
      {/* <Toolbar /> */}
      <Toolbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/event-details-page" element={<EventDetailsPage />} />
          <Route path="/event-details" element={<EventDetail />} />
          {/* <Route path="/event-search" element={<EventSearchResult />} /> */}
          
          {/* <Route path="/organizer-homepage" element={<OrganizerHomepage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/event-list" element={<EventList />} /> */}
          {/* <Route path="/event-detail" element={<EventDetail />} /> */}
          {/* <Route path="/attendance-list" element={<AttendanceList />} /> */}
          {/* <Route path="/attendance-detail-card" element={<AttendanceDetailCard />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;