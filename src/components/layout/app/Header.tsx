import {useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {useNavigate} from "react-router-dom";
import {removeToken} from "../../../wrapper/Apollo";

export default function AppHeader() {
    const { data: { currentUser: { name } }, refetch } = useContext(AccountContext);

    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        refetch().then(() => navigate('/login'));
    };

    return (
        <div className="flex grow justify-between items-center">
            <input className="main" placeholder="Search" />
            <div className="flex items-center space-x-4">
                <p>{name}</p>
                <button className="secondary" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
