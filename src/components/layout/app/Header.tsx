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
        <div className="flex items-center">
            {data && <input className="main" placeholder={translate("layout.header.search.label")}/>}
            <div className="flex w-full justify-end space-x-4">
                <Language />
                {data ? <Logged /> : <Guest />}
            </div>
        </div>
    )
}

function Logged() {
    const { translate } = useContext(LanguageContext);

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
                icon: 'fa-regular fa-sparkles',
                href: '/pricing'
            },
            [Path.LOGOUT]: {
                id: 'logout',
                icon: 'fa-regular fa-arrow-right-from-bracket',
                href: '/logout'
            }
        }
    }

    return (
        <ContextMenu list={paths} content={<Item/>}>
            <button className="secondary rounded inline">
                <i className="fa-regular fa-user" />
                <p>{translate("layout.header.account.label")}</p>
            </button>
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
            <a className="secondary rounded" href="/login">{translate("layout.header.account.login.label")}</a>
            <a className="secondary rounded" href="/login">{translate("layout.header.account.signup.label")}</a>
        </Fragment>
    )
}
