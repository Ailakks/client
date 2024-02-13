import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useEffect} from "react";
import {removeToken} from "../../../wrapper/Apollo";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

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
