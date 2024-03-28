import {createContext, useContext} from 'react';
import {CookiesContext} from "../tool/Cookies";

import lang from "../../../resources/lang.json";

export const LanguageContext = createContext(null);

export default function LanguageWrapper({ children }) {
    const { getCookie } = useContext(CookiesContext);

    const fallback = "en_us";
    const language = getCookie("language") ?? fallback;

    const getValue = (object, path) => {
        return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), object);
    }

    const translate = (path: string) => {
        return getValue(lang, `${language}.${path}`) ?? path;
    }

    return (
        <LanguageContext.Provider value={{ language, translate }}>
            {children}
        </LanguageContext.Provider>
    );
}