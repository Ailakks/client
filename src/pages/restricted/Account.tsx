import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AccountContext} from "../../components/wrapper/account/Account";

export default function AccountRestricted({ children }) {
    const navigate = useNavigate();

    const { account } = useContext(AccountContext);

    useEffect(() => {
        if (!account) {
            navigate('/login')
        }
    }, [account]);

    if (!account) {
        return null;
    }

    return children;
}
