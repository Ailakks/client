import {useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

export default function AppHeader() {
    const { translate } = useContext(LanguageContext);

    const { data } = useContext(AccountContext);

    if (data) {
        const { currentUser: { name } } = data;

        return (
            <div className="flex grow justify-between items-center">
                <input className="main" placeholder={translate("layout.head.search.label")} />
                <div className="flex items-center space-x-4">
                    <p>{name}</p>
                    <a className="secondary" href="/logout">{translate("layout.head.account.logout.label")}</a>
                </div>
            </div>
        )
    }

    return (
        <div className="flex grow justify-between items-center">
            <input className="main" placeholder="Search" />
            <div className="flex items-center space-x-4">
                <button className="main">Login</button>
            </div>
        </div>
    )
}
