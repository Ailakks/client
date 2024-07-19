import {useContext} from "react";
import {AccountContext} from "../wrapper/account/Account";
import {Guest, Logged} from "../header/AccountMenu";
import {useNavigate} from "react-router-dom";
import {Input} from "../query/Input";
import LanguageMenu from "../header/LanguageMenu";

export default function Header() {
    const navigate = useNavigate();

    const { response } = useContext(AccountContext);

    const search = (query: string) => {
        navigate('search', { state: { query } });
    };

    return (
        <div className="h-full flex items-center justify-end">
            <Input onChange={({ target: { value } }) => search(value)} />
            <div className="flex w-full justify-end items-center space-x-6">
                <LanguageMenu/>
                {response ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}
