import { useContext } from "react";
import { LanguageContext } from "../../../wrapper/lang/LanguageWrapper";

export default function NoContentFallback() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="fallback">
            <h2>{translate("fallback.204.title")}</h2>
        </div>
    )
}