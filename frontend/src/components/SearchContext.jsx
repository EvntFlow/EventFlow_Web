import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [searchData, setSearchData] = useState({
      minDate: '',
      maxDate: '',
      minPrice: '',
      maxPrice: '',
      keywords: '',
      location: '',
    });

    return (
        <SearchContext.Provider value={{ searchData, setSearchData }}>
            {children}
        </SearchContext.Provider>
    );
};