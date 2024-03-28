import {Fragment, useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import ContextMenuItem from "../../context/ContextMenuItem";
import {ListContext} from "../../list/List";
import {clsx} from "clsx";

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
    const { translate } = useContext(LanguageContext);

    const { data: { currentUser: { name } } } = useContext(AccountContext);

    return (
        <Fragment>
            <p>{name}</p>
            <a className="secondary" href="/logout">{translate("layout.header.account.logout.label")}</a>
        </Fragment>
    )
}

function Guest() {
    const { translate } = useContext(LanguageContext);

    return (
        <Fragment>
            <a className="secondary" href="/login">{translate("layout.header.account.login.label")}</a>
        </Fragment>
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
        <ContextMenu list={locales} content={<Item />}>
            <button className="menu">
                <i className="fa-regular fa-globe" />
            </button>
        </ContextMenu>
    )
}

function Item() {
    const { locale, translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);
    const { id, icon, action } = item;

    return (
        <div className="flex items-center justify-between text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(item)}>
            <div className="flex items-center space-x-2">
                <i className={clsx('w-6', icon)}/>
                <p>{translate(`layout.header.language.context.${id}`)}</p>
            </div>
            {locale === id && <i className="fa-regular fa-check"/>}
        </div>
    )
}
