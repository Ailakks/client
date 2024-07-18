import {useContext} from "react";
import Language from "../language/Language";
import {AccountContext} from "../wrapper/account/Account";
import {Guest, Logged} from "../wrapper/header/AccountMenu";

export default function Header() {
    const { response } = useContext(AccountContext);

    return (
        <div className="h-full flex items-center justify-end">
            <div className="flex w-full justify-end items-center space-x-6">
                <Language/>
                {response ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}
