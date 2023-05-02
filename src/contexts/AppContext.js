import React, { useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const AppContext = React.createContext({});


export function useApp() {
    return useContext(AppContext);
}



export default function AppProvider({ children }) {
    const [showChat, setShowChat] = useLocalStorage("show-chat",false)
    const [chat, setChat] = useLocalStorage("chat",false)
 
    const values={
        showChat,
        setShowChat,
        chat,
        setChat
    }
    return (
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
