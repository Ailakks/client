import {createContext, useContext} from 'react';
import {AxiosContext} from "../api/Api";
import Query, {QueryContext} from "../../query/Query";

export const AccountContext = createContext(null);

export default function AccountWrapper({ children }) {
    const { useClient } = useContext(AxiosContext);

    const request = useClient('user');

    return (
        <Query request={request}>
            <Body>
                {children}
            </Body>
        </Query>
    );
}

function Body({ children }) {
    const { data } = useContext(QueryContext);

    return (
        <AccountContext.Provider value={{ account: data }}>
            {children}
        </AccountContext.Provider>
    );
}
