import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AccountContext} from "../../components/wrapper/account/Account";

export default function AccountRestricted({ children }) {
    const navigate = useNavigate();

    const { response } = useContext(AccountContext);

    useEffect(() => {
        if (!response) {
            navigate('/login')
        }
    }, [response]);

    if (!response) {
        return null;
    }

    return children;
}
