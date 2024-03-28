import {createContext, useContext} from 'react';
import {CookiesContext} from "../tool/Cookies";

import lang from "../../../resources/lang.json";

export const LanguageContext = createContext(null);

export const Category = {
    LANGUAGE: "language",
}

export const Locale = {
    en_CA: "EN_CA",
    es_ES: "ES_ES"
}

export default function LanguageWrapper({ children }) {
    const { setCookie } = useContext(CookiesContext);

    const change = ({ id }) => {
        setCookie("language", id);

        window.location.reload();
    };

    const locales = {
        [Category.LANGUAGE]: {
            [Locale.en_CA]: {
                id: 'en_CA',
                icon: 'fa-regular fa-globe',
                component: {
                    date: "enCA",
                    intl: "en-US"
                },
                action: change,
            },
            [Locale.es_ES]: {
                id: 'es_ES',
                icon: 'fa-regular fa-globe',
                component: {
                    date: "es",
                    intl: "es-ES"
                },
                action: change,
            }
        }
    }

    const { getCookie } = useContext(CookiesContext);

    const fallback = Locale.enCA;
    const language = getCookie("language") ?? locales[fallback].id;

    const getValue = (object, path) => {
        return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), object);
    }

    const translate = (path: string, args: string[]) => {
        const translation = getValue(lang, `${language}.${path}`) ?? path

        return translation.replace(/\{(\d+)}/g, (match, index) => args[index] ?? match);
    }

    return (
        <LanguageContext.Provider value={{ locales, language, translate }}>
            {children}
        </LanguageContext.Provider>
    );
}