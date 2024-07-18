import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";
import Language from "../language/Language";
import {AccountContext} from "../wrapper/account/Account";
import ContextMenu from "../context/ContextMenu";
import {ListContext} from "../list/List";

export default function Header() {
    const { response } = useContext(AccountContext);

    return (
        <div className="h-full flex items-center justify-end">
            <div className="flex w-full justify-end items-center space-x-6">
                <Language/>
                {response ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}

function Logged() {
    const { translate } = useContext(LanguageContext);

    const { response: { name } } = useContext(AccountContext);

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
