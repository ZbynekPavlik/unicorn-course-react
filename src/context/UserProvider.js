// UserProvider.js
import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(true); // Defaultně nastavíme na false

    return (
        <UserContext.Provider value={{isAuthorized, setIsAuthorized}}>
            {children}
        </UserContext.Provider>
    );
};
