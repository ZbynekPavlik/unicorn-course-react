import React, {createContext, useState} from 'react';

export const ItemTypeContext = createContext();

export const ItemTypeProvider = ({children}) => {
    const [itemType, setItemType] = useState();

    return (
        <ItemTypeContext.Provider value={{itemType, setItemType}}>
            {children}
        </ItemTypeContext.Provider>
    );
};