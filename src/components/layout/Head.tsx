import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";

export default function Head() {
    const { translate } = useContext(LanguageContext);

    return (
        <h3>
            <a href="/">{translate("layout.head.title")}</a>
        </h3>
    )
}
