import {createContext} from 'react';
import lang from "../../../resources/lang.json";

export const LanguageContext = createContext(null);

export default function LanguageProvider({ children }) {
    const translate = (path: string) => {
        return lang[`es.${path}`];
    }

    return (
        <LanguageContext.Provider value={{ translate }}>
            {children}
        </LanguageContext.Provider>
    );
}