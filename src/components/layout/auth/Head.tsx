import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/Language";

export default function AuthHead() {
    const { translate } = useContext(LanguageContext);

    return (
        <a className="text-white" href="/">{translate("layout.head.name")}</a>
    )
}
