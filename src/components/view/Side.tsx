import {NavLink} from "react-router-dom";
import { clsx } from 'clsx';

const pages = [
    {
        id: 'home',
        path: '',
        name: 'Home',
        icon: 'fa-regular fa-house'
    },
    {
        id: 'recent',
        path: '/recent',
        name: 'Recent',
        icon: 'fa-regular fa-clock'
    },
    {
        id: 'trash',
        path: '/trash',
        name: 'Trash',
        icon: 'fa-regular fa-trash'
    }
]

export default function Side() {
    return (
        <div className="flex flex-col justify-between">
            {
                pages.map(({ icon, path, name }, key) => {
                    return (
                        <NavLink key={key} className={({ isActive }) => clsx('navlink', 'flex space-x-2 items-center', isActive && 'bg-blue-900')} to={path}>
                            <i className={clsx(icon, 'w-5')} />
                            <p>{name}</p>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
