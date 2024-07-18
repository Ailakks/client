import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";

export default function Side() {
    const { translate } = useContext(LanguageContext);

    return (
        <div>
            <h1>{translate("layout.side.library.title")}</h1>
        </div>
    )
}
