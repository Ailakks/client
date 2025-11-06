import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CookiesContext} from "../../../wrapper/tool/Cookies";

export default function Logout() {
    const navigate = useNavigate();

    const { removeToken } = useContext(CookiesContext);

    useEffect(() => {
        removeToken();
        navigate('/login');

        window.location.reload();
    }, []);

    return (
        <div className="h-full flex justify-center items-center space-x-4">
            <LoadSpinner />
            <p>Logging out...</p>
        </div>
    )
}
