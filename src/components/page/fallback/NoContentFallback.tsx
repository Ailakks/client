import UploadZone from "../../native/upload/UploadZone";
import { useContext } from "react";
import { LanguageContext } from "../../../wrapper/lang/LanguageWrapper";

export default function NoContentFallback() {
    const { translate } = useContext(LanguageContext);

    return (
        <UploadZone>
            <div className="h-full flex flex-col justify-center items-center space-y-4">
                <h2>{translate("fallback.204.title")}</h2>
                <p>{translate("fallback.204.body")}</p>
            </div>
        </UploadZone>
    )
}