import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";

export default function Header() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="h-full flex items-center justify-end">
            <a href="">
                <p>{translate("layout.header.support.label")}</p>
            </a>
        </div>
    )
}
