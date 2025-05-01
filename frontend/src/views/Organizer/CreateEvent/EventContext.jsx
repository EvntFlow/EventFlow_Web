import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
    const [eventData, setEventData] = useState({
        name: '',
        category: '',
        startDate: '',
        startTime: '',
        location: '',
        description: '',
        bannerUri: '',
        isTicketed: false,
    });

    return (
        <EventContext.Provider value={{ eventData, setEventData }}>
            {children}
        </EventContext.Provider>
    );
};
