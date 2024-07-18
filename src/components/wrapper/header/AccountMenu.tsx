import {clsx} from "clsx";
import {useContext} from "react";
import {LanguageContext} from "./LanguageMenu";
import {AccountContext} from "../account/Account";
import ContextMenu from "../../context/ContextMenu";
import {ListContext} from "../../list/List";

export function Logged() {
    const { translate } = useContext(LanguageContext);

    const { response: { name } } = useContext(AccountContext);

    const Category = {
        ACCOUNT: "account",
    }

    const Path = {
        ACCOUNT: "account",
        LOGOUT: "logout"
    }

    const paths = {
        [Category.ACCOUNT]: {
            [Path.ACCOUNT]: {
                id: 'account',
                icon: 'fa-regular fa-user',
                href: '/account'
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
                <p>{translate("layout.header.account.label", [name])}</p>
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

export function Guest() {
    const {translate} = useContext(LanguageContext);

    return (
        <Fragment>
            <a className="secondary rounded" href="/login">{translate("layout.header.account.login.label")}</a>
            <a className="secondary rounded" href="/login">{translate("layout.header.account.signup.label")}</a>
        </Fragment>
    )
}
