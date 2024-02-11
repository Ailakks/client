import {useContext} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {useNavigate} from "react-router-dom";
import {removeToken} from "../../../wrapper/Apollo";

export default function AppHeader() {
    const { refetch } = useContext(AccountContext);

    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        refetch().then(() => navigate('/login'));
    };

    return (
        <div className="flex grow justify-between items-center">
            <input className="main" placeholder="Search" />
            <button className="secondary" onClick={logout}>Logout</button>
        </div>
    )
}
