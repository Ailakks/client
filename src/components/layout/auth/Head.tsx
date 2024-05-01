import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

export default function AuthHead() {
    const { translate } = useContext(LanguageContext);

    return (
        <a className="text-white" href="/">{translate("layout.head.name")}</a>
    )
}
