import {NavLink} from "react-router-dom";
import { clsx } from 'clsx';
import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/Language";
import List, {ListContext} from "../../list/List";

const pages = [
    {
        id: 'home',
        name: 'Home',
        list: [
            {
                id: 'dashboard',
                path: '/',
                name: 'Dashboard',
                icon: 'fa-regular fa-house'
            }
        ]
    },
    {
        id: 'widgets',
        name: 'Widgets',
        list: [
            {
                id: 'marketplace',
                path: '/marketplace',
                name: 'Marketplace',
                icon: 'fa-regular fa-store'
            },
            {
                id: 'widgets',
                path: '/widgets',
                name: 'Widgets',
                icon: 'fa-regular fa-window-restore'
            }
        ]
    },
    {
        id: 'tools',
        name: 'Tools',
        list: [
            {
                id: 'voices',
                path: '/voices',
                name: 'Custom voices',
                icon: 'fa-regular fa-microphone'
            }
        ]
    },
    {
        id: 'settings',
        name: 'Settings',
        list: [
            {
                id: 'channels',
                path: '/channels',
                name: 'Channels',
                icon: 'fa-regular fa-user'
            },
            {
                id: 'organizations',
                path: '/organizations',
                name: 'Organizations',
                icon: 'fa-regular fa-bolt'
            },
            {
                id: 'settings',
                path: '/settings',
                name: 'Settings',
                icon: 'fa-regular fa-gear'
            }
        ]
    }
]

export default function AppSide() {
    return (
        <div className="flex flex-col h-full bg-gray-700">
            <List list={pages}><Section /></List>
        </div>
    )
}

function Section() {
    const { translate } = useContext(LanguageContext);

    const { item: { id, list } } = useContext(ListContext);

    return (
        <div>
            <div className="p-5">
                <h2>{translate(`layout.navbar.section.${id}`)}</h2>
            </div>
            <List list={list}><Item/></List>
        </div>
    )
}

function Item() {
    const {translate} = useContext(LanguageContext);

    const {key, item: {id, path, icon } } = useContext(ListContext);

    return (
        <NavLink key={key} className={({ isActive }) => clsx('navlink', 'flex space-x-2 items-center', isActive && 'bg-orange-900')} to={path} end>
            <i className={clsx(icon, 'w-5')} />
            <p>{translate(`layout.navbar.page.${id}`)}</p>
        </NavLink>
    )
}