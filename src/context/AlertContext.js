// AlertContext.js
import {createContext, useState} from "react";

const AlertContext = createContext();

const AlertProvider = ({children}) => {
    const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

    return (
        <AlertContext.Provider value={{alertMessage, setAlertMessage, showAlert, setShowAlert}}>
            {children}
        </AlertContext.Provider>
    );
};

export {AlertContext, AlertProvider};