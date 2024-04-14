import {NavLink} from "react-router-dom";
import { clsx } from 'clsx';
import {useContext} from "react";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

const pages = [
    {
        id: 'home',
        path: '/',
        name: 'Home',
        icon: 'fa-regular fa-house'
    },
    {
        id: 'trash',
        path: '/trash',
        name: 'Trash',
        icon: 'fa-regular fa-trash'
    }
]

export default function AppSide() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="flex flex-col h-full bg-gray-700">
            {
                pages.map(({ id, icon, path }, key) => {
                    return (
                        <NavLink key={key} className={({ isActive }) => clsx('navlink', 'flex space-x-2 items-center', isActive && 'bg-orange-900')} to={path} end>
                            <i className={clsx(icon, 'w-5')} />
                            <p>{translate(`layout.navbar.page.${id}`)}</p>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
