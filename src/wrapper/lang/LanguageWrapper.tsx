import {createContext, useContext} from 'react';
import {CookiesContext} from "../tool/Cookies";

import lang from "../../../resources/lang.json";
import Language from "../../components/layout/components/button/Language";

export const LanguageContext = createContext(null);

export default function LanguageWrapper({ children }) {
    const { setCookie } = useContext(CookiesContext);

    const set = ({ id }) => {
        setCookie("language", id);

        window.location.reload();
    };

    const locales = [
        {
            id: 'en_CA',
            icon: 'fa-regular fa-globe',
            component: {
                date: "enCA",
                intl: "en-US"
            }
        },
        {
            id: 'es_ES',
            icon: 'fa-regular fa-globe',
            component: {
            date: "es",
                intl: "es-ES"
            }
        },
    ]

    const { getCookie } = useContext(CookiesContext);

    const language = getCookie("language") ?? locales[0].id;

    const getValue = (object, path) => {
        return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), object);
    }

    const translate = (path: string, args: string[]) => {
        const translation = getValue(lang, `${language}.${path}`) ?? path

        return translation.replace(/\{(\d+)}/g, (match, index) => args[index] ?? match);
    }

    return (
        <LanguageContext.Provider value={{ locales, language, translate, set }}>
            {children}
        </LanguageContext.Provider>
    );
}