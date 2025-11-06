import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

export default function AppHead() {
    const { translate } = useContext(LanguageContext);

    return (
        <a className="h-full flex items-center w-52 text-white" href="/">{translate("layout.head.name")}</a>
    )
}
