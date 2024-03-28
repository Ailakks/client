import {Fragment, useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import {ListContext} from "../../list/List";
import {clsx} from "clsx";
import {CookiesContext} from "../../../wrapper/tool/Cookies";

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
    const { setCookie } = useContext(CookiesContext);

    const Category = {
        LANGUAGE: "language",
    }

    const Locale = {
        en_us: "EN_US",
        es_es: "ES_ES"
    }

    const change = ({ id }) => {
        setCookie("language", id);

        window.location.reload();
    };

    const locales = {
        [Category.LANGUAGE]: {
            [Locale.en_us]: {
                id: 'en_us',
                icon: 'fa-regular fa-globe',
                action: change,
            },
            [Locale.es_es]: {
                id: 'es_es',
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
    const { language, translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);
    const { id, icon, action } = item;

    return (
        <div className="flex items-center justify-between text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(item)}>
            <div className="flex items-center space-x-2">
                <i className={clsx('w-6', icon)}/>
                <p>{translate(`layout.header.language.context.${id}`)}</p>
            </div>
            {language === id && <i className="fa-regular fa-check"/>}
        </div>
    )
}
