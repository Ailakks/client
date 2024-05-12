import {createContext, useContext} from 'react';
import Query, {QueryContext} from "../../components/query/Query";
import {gql, useQuery} from "@apollo/client";

export const AccountContext = createContext(null);

export default function AccountWrapper({ children }) {
    const request = useQuery(gql`
        query currentUser {
            id
            name
            surname
            username
            email {
                value
                verified
            }
            picture {
                source
            }
            roles {
                id
                name
                displayName
                permissions
                __typename
            }
            __typename
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
        <AccountContext.Provider value={{ data, refetch }}>
            {children}
        </AccountContext.Provider>
    );
}
