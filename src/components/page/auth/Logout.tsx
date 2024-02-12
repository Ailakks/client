import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useContext, useEffect} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {removeToken} from "../../../wrapper/Apollo";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const { refetch } = useContext(AccountContext);

    useEffect(() => {
        removeToken();
        refetch().then(() => navigate('/login'));
    }, []);

    return (
        <div className="h-full flex justify-center items-center space-x-4">
            <LoadSpinner />
            <p>Logging out...</p>
        </div>
    )
}
