import {useContext} from "react";
import {AccountContext} from "./api/Account";

export default function LoggedWrapper({ children }) {
    const { data } = useContext(AccountContext);

    if (data) {
        return children;
    }

    return children;
}
