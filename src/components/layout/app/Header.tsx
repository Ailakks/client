import {Fragment, useContext, useEffect} from "react";
import {AccountContext} from "../../../wrapper/api/Account";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../context/ContextMenu";
import Language from "../components/button/Language";
import {clsx} from "clsx";
import {ListContext} from "../../list/List";
import {HeaderContext} from "../dash/Dash";
import {useLocation} from "react-router-dom";

export default function AppHeader() {
    const { header, setHeader } = useContext(HeaderContext);
    const { data } = useContext(AccountContext);

    const location = useLocation();

    useEffect(() => {
        setHeader(null);
    }, [location]);

    return (
        <div className="flex items-center h-full bg-gray-700 p-5">
            {header ?? <AppHead />}
            <div className="flex w-full justify-end items-center space-x-6">
                <Language/>
                {data ? <Logged/> : <Guest/>}
            </div>
        </div>
    )
}

export function AppHead() {
    const {translate} = useContext(LanguageContext);

    return (
        <h2 className="space-x-2 items-center text-nowrap">
            <a className="text-white" href="/">{translate("layout.header.name")}</a>
            <label className="main">Beta</label>
        </h2>
    )
}

function Logged() {
    const {translate} = useContext(LanguageContext);

    const {data: {currentUser: {name, roles}}} = useContext(AccountContext);

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
                <p>{roles.length > 0 ? translate(`layout.header.roles.${roles[0].name}`) : translate(`layout.header.roles.default`)}</p>
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
