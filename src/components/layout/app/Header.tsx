import {Fragment, useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import Language from "../components/button/Language";

export default function AppHeader() {
    const { translate } = useContext(LanguageContext);

    const { data } = useContext(AccountContext);

    return (
        <div className="flex grow justify-between items-center">
            <input className="main" placeholder={translate("layout.header.search.label")} />
            <div className="flex items-center space-x-4">
                <Language />
                {data ? <Logged /> : <Guest />}
            </div>
        </div>
    )
}

function Logged() {
    const { data: { currentUser: { name } } } = useContext(AccountContext);

    return (
        <ContextMenu list={[]} content={<Item/>}>
            <button className="secondary round">{name}</button>
        </ContextMenu>
    )
}

function Item() {
    const { translate } = useContext(LanguageContext);

    return (
        <a></a>
    )
}

function Guest() {
    const {translate} = useContext(LanguageContext);

    return (
        <Fragment>
            <a className="secondary" href="/login">{translate("layout.header.account.login.label")}</a>
        </Fragment>
    )
}
