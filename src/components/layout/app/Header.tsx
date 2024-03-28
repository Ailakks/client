import {Fragment, useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import Language from "../components/button/Language";
import {clsx} from "clsx";
import {ListContext} from "../../list/List";

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

    const Category = {
        ACCOUNT: "account",
    }

    const Path = {
        PRICING: "PRICING",
        LOGOUT: "logout"
    }

    const paths = {
        [Category.ACCOUNT]: {
            [Path.PRICING]: {
                id: 'pricing',
                href: '/pricing'
            },
            [Path.LOGOUT]: {
                id: 'logout',
                href: '/logout'
            }
        }
    }

    return (
        <ContextMenu list={paths} content={<Item/>}>
            <button className="secondary round">{name}</button>
        </ContextMenu>
    )
}

function Item() {
    const { translate } = useContext(LanguageContext);

    const { item: { id, icon, href } } = useContext(ListContext);

    return (
        <a className="context_item" href={href}>
            <i className={clsx('w-6', icon)}/>
            <p>{translate(`layout.header.account.context.${id}`)}</p>
        </a>
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
