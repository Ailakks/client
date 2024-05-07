import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/Language";

export default function AuthLayout({ children }) {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="h-full p-10">
            {children}
            <div className="absolute bottom-8 left-8">
                <a href="/" className="flex items-center space-x-5 p-2 [&_*]:hover:text-orange-500">
                    <i className="fa-regular fa-arrow-left" />
                    <p>{translate("auth.footer.back")}</p>
                </a>
            </div>
        </div>
    )
}
