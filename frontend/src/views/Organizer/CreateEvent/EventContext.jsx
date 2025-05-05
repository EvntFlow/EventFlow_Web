import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
    const [eventData, setEventData] = useState(() => {
        const savedEventData = localStorage.getItem('eventData');
        return savedEventData ? JSON.parse(savedEventData) : {
            name: '',
            category: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
            bannerUri: '',
            isTicketed: false,
            ticketName: '',
            ticketPrice: '',
            ticketCount: ''
        };
    });

    // Save to localStorage whenever eventData changes
    useEffect(() => {
        localStorage.setItem('eventData', JSON.stringify(eventData));
    }, [eventData]);

    // Custom setter that both updates state and localStorage
    const updateEventData = (newData) => {
        const updatedData = typeof newData === 'function' 
            ? newData(eventData) 
            : { ...eventData, ...newData };
            
        setEventData(updatedData);
        localStorage.setItem('eventData', JSON.stringify(updatedData));
    };

    // Function to clear event data after publishing
    const clearEventData = () => {
        localStorage.removeItem('eventData');
        setEventData({
            name: '',
            category: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
            bannerUri: '',
            isTicketed: false,
            ticketName: '',
            ticketPrice: '',
            ticketCount: ''
        });
    };
    
    return (
        <EventContext.Provider value={{ 
            eventData, setEventData: 
            updateEventData, 
            clearEventData 
        }}>
            {children}
        </EventContext.Provider>
    );
};
