import {useContext} from "react";
import {AccountContext} from "./api/Account";
import KeyWrapper from "./logged/Key";

export default function LoggedWrapper({ children }) {
    const { data } = useContext(AccountContext);

    if (data) {
        return (
            <KeyWrapper>
                {children}
            </KeyWrapper>
        )
    }

    return children;
}
