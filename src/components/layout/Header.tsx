import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";

export default function Header() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="h-full flex items-center justify-end">
            <div className="flex w-full justify-end items-center space-x-6">
                <Language/>
                {data ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}
