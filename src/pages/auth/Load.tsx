import LoadSpinner from "../../components/load/spinner/LoadSpinner";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CookiesContext} from "../../components/wrapper/tool/Cookies";
import {AxiosContext} from "../../components/wrapper/api/Api";

export function Load({ id }) {
    const navigate = useNavigate();

    const { useClient } = useContext(AxiosContext);
    const { setToken } = useContext(CookiesContext);

    const [{ data }] = useClient({ url: 'auth/token', params: { id } });

    if (data) {
        setToken(data);
        navigate('/');

        window.location.reload();
    }

    return (
        <LoadSpinner />
    )
}
