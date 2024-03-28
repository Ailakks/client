import {createContext} from 'react';
import lang from "../../../resources/lang.json";

export const LanguageContext = createContext(null);

export default function LanguageProvider({ children }) {
    const getValue = (object, path) => {
        return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), object);
    }

    const translate = (path: string) => {
        return getValue(lang, `es.${path}`);
    }

    return (
        <LanguageContext.Provider value={{ translate }}>
            {children}
        </LanguageContext.Provider>
    );
}