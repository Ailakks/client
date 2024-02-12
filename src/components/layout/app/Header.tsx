import {useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";

export default function AppHeader() {
    const { data: { currentUser: { name } } } = useContext(AccountContext);

    return (
        <div className="flex grow justify-between items-center">
            <input className="main" placeholder="Search" />
            <div className="flex items-center space-x-4">
                <p>{name}</p>
                <a className="secondary" href="/logout">Logout</a>
            </div>
        </div>
    )
}
