import { formatRelative } from "date-fns";
import {useContext} from "react";
import {LanguageContext} from "../../wrapper/lang/LanguageWrapper";
import locale from "date-fns/locale";

export default function Moment({ children }) {
    const { language } = useContext(LanguageContext);

    if (!children) {
        return;
    }

    return (
        <span>{formatRelative(new Date(children), new Date(), { locale: null }) }</span>
    )
}