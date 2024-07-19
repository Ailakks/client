import {useContext} from "react";
import Language from "../language/Language";
import {AccountContext} from "../wrapper/account/Account";
import {Guest, Logged} from "../wrapper/header/AccountMenu";
import {Input} from "../query/Input";

export default function Header() {
    const { response } = useContext(AccountContext);

    return (
        <div className="h-full flex items-center justify-end">
            <Input />
            <div className="flex w-full justify-end items-center space-x-6">
                <Language/>
                {response ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}
