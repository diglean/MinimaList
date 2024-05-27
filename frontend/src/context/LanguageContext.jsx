import React, { createContext, useState, useContext } from "react";
import { UserConfigContext } from "./UserConfigContext";

const LanguageContext = createContext();
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageContextProvider({ children }) {
  const { userConfig } = useContext(UserConfigContext);
  const [language, changeLanguage] = useState(userConfig.language_id);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
