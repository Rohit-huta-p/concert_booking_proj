import  { createContext, useState } from "react";

export const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [concerts, setConcerts] = useState([]);

    
    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            concerts,
            setConcerts
        
        }}>
            {children}
        </GlobalContext.Provider>
    );
};


