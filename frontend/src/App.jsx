import React from 'react';
// import PaymentPage from './components/PaymentPage';
// import Homepage from './views/Homepage/Homepage';
import EventDetailsPage from './views/EventExploration/EventDetailsPage';
// import LoginRegistrationHome from './views/Login_Registration/LoginRegistrationHome';
// import EventSearchResult from './views/EventExploration/EventSearchResult';
// import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';

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
      <EventDetailsPage/>
      {/* <EventSearchResult/> */}
      {/* <LoginRegistrationHome/> */}
      {/* <OrganizerHomepage/> */}


      {/* <AttendeeDetailsForm/> */}
    </div>
  );
}

export default App;
