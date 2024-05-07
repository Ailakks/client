import { useContext } from "react";
import { LanguageContext } from "../../../wrapper/lang/Language";

export default function NotFoundFallback() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="fallback">
            <h2>{translate("fallback.404.title")}</h2>
            <a href="/">{translate("fallback.404.back.label")}</a>
        </div>
    )
}