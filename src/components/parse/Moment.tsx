import { formatRelative } from "date-fns";
import {useContext} from "react";
import {Category, LanguageContext, Locale} from "../../wrapper/lang/LanguageWrapper";
import * as fnsLocales from "date-fns/locale";

export default function Moment({ children }) {
    const { locales, language } = useContext(LanguageContext);

    if (!children) {
        return;
    }

    return (
        <span>{formatRelative(new Date(children), new Date(), { locale: fnsLocales[locales[Category.LANGUAGE][Locale[language]].component.date] }) }</span>
    )
}