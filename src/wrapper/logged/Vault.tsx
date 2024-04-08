import {createContext, useContext} from "react";
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../../components/query/Query";
import AccountRestricted from "../../components/restricted/Account";

export const VaultContext = createContext(null);

export default function VaultWrapper({ children }) {
    const request = useQuery(gql`
        query {
            getMainVault {
                id
                name
                root {
                    id
                    __typename
                }
                __typename
            }
        }`
    );

    return (
        <AccountRestricted>
            <Query request={request}>
                <Body>
                    {children}
                </Body>
            </Query>
        </AccountRestricted>
    );
}

function Body({ children }) {
    const { data, refetch } = useContext(QueryContext);

    return (
        <VaultContext.Provider value={{ data, refetch }}>
            {children}
        </VaultContext.Provider>
    );
}
