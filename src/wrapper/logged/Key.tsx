import {createContext, useContext} from 'react';
import Query, {QueryContext} from "../../components/query/Query";
import {gql, useQuery} from "@apollo/client";

export const KeyContext = createContext(null);

export default function KeyWrapper({ children }) {
    const request = useQuery(gql`
        query {
            decryptedKey {
                public
                private
                __typename
            }
        }`);

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
        <KeyContext.Provider value={{ data, refetch }}>
            {children}
        </KeyContext.Provider>
    );
}
