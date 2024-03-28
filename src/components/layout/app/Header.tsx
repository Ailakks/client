import {useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import ContextMenuItem from "../../context/ContextMenuItem";

export default function AppHeader() {
    const { translate } = useContext(LanguageContext);

    const { data } = useContext(AccountContext);

    if (data) {
        const { currentUser: { name } } = data;

        return (
            <div className="flex grow justify-between items-center">
                <input className="main" placeholder={translate("layout.head.search.label")} />
                <div className="flex items-center space-x-4">
                    <Language />
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

function Language() {
    const { translate } = useContext(LanguageContext);

    const Category = {
        LANGUAGE: "language",
    }

    const Locale = {
        en_us: "EN_US",
    }

    const change = () => {

    };

    const locales = {
        [Category.LANGUAGE]: {
            [Locale.en_us]: {
                id: 'en_us',
                icon: 'fa-regular fa-globe',
                action: change,
            }
        }
    }

    return (
        <ContextMenu list={locales} content={<ContextMenuItem />}>
            <button className="menu">
                <i className="fa-regular fa-globe" />
            </button>
        </ContextMenu>
    )
}