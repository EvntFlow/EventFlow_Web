import React from 'react';
import Homepage from './views/Homepage/Homepage';
import EventDetailsPage from './views/EventExploration/EventDetailsPage';
import LoginRegistrationHome from './views/Login_Registration/LoginRegistrationHome';
import EventSearchResult from './views/EventExploration/EventSearchResult';
import OrganizerHomepage from './views/Organizer/Homepage/OrganizerHomepage';
const App= () => {
  return (
    <div>
      {/* <Homepage/> */}
      {/* <EventDetailsPage/> */}
      {/* <EventSearchResult/> */}
      {/* <LoginRegistrationHome/> */}
      <OrganizerHomepage/>
    </div>
  );
}

export default App;
