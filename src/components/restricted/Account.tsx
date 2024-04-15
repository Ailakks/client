import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AccountContext} from "../../wrapper/api/Account";

export default function AccountRestricted({ children }) {
    const navigate = useNavigate();

    const { data } = useContext(AccountContext);

    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    }, [data]);

    if (!data) {
        return null;
    }

    return children;
}
