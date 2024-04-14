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
        <div className="flex items-center h-full bg-gray-700 p-5">
            <h2 className="text-nowrap">
                <a className="text-white" href="/">{translate("layout.header.name")}</a>
            </h2>
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

    const list = [
        {
            id: 'pricing',
            icon: 'fa-regular fa-user',
            href: '/pricing'
        },
        {
            id: 'logout',
            icon: 'fa-regular fa-arrow-right-from-bracket',
            href: '/logout'
        }
    ];

    return (
        <Fragment>
            <ContextMenu list={list} content={<Item />}>
                <button className="secondary rounded inline">
                    <i className="fa-regular fa-user" />
                    <p>{translate("layout.header.account.label")}</p>
                </button>
            </ContextMenu>
            <div>
                <p>{translate("layout.header.account.banner.hello", [name])}</p>
                <p>Admin</p>
            </div>
        </Fragment>
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
    const { translate } = useContext(LanguageContext);

    return (
        <Fragment>
            <a className="secondary rounded" href="/login">{translate("layout.header.account.login.label")}</a>
            <a className="secondary rounded" href="/login">{translate("layout.header.account.signup.label")}</a>
        </Fragment>
    )
}
