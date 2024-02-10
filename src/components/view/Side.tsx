import {NavLink} from "react-router-dom";
import { clsx } from 'clsx';

const pages = [
    {
        id: 'home',
        path: '',
        name: 'Home',
        icon: ''
    },
    {
        id: 'recent',
        path: '/recent',
        name: 'Recent',
        icon: ''
    },
    {
        id: 'trash',
        path: '/trash',
        name: 'Trash',
        icon: ''
    }
]

export default function Side() {
    return (
        <div className="flex flex-col justify-between">
            {
                pages.map(({ icon, path, name }, key) => {
                    return (
                        <NavLink key={key} className={({ isActive }) => clsx('navlink', isActive && 'bg-blue-900')} to={path}>{name}</NavLink>
                    )
                })
            }
        </div>
    )
}
