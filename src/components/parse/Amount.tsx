import {useContext} from "react";
import {Category, LanguageContext, Locale} from "../../wrapper/lang/LanguageWrapper";

export default function Amount({ currency, children }) {
    const { locales, language } = useContext(LanguageContext);

    return (
        <span>{new Intl.NumberFormat(locales[Category.LANGUAGE][Locale[language]].component.intl, { style: 'currency', currency: currency }).format(children / 100)}</span>
    )
}