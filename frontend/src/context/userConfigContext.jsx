import { createContext, useState } from "react";

export const UserConfigContext = createContext();

export const UserConfigProvider = ({ children }) => {
    const DEFAULT_USER_CONFIG = {
        language: "pt_br",
        theme: "dark",
        currency: "BRL",
    };
    
    const [userConfig, setUserConfig] = useState(DEFAULT_USER_CONFIG);

    return (
        <UserConfigContext.Provider value={{ userConfig, setUserConfig}}>
            {children}
        </UserConfigContext.Provider>
    );
};