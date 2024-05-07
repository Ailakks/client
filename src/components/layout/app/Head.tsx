import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/Language";

export default function AppHead() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="bg-gray-700 h-full">
            <h2>
                <a className="h-full flex items-center w-52 text-white" href="/">{translate("layout.head.name")}</a>
            </h2>
        </div>
    )
}
