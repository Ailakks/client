import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../query/Query";
import {useContext} from "react";

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
        <Query request={request}>
            <Body>
                {children}
            </Body>
        </Query>
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
