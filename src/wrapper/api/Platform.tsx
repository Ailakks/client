import {createContext, useContext} from 'react';
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../../components/query/Query";

export const PlatformContext = createContext(null);

export default function PlatformWrapper({ children }) {
    const request = useQuery(gql`
        query {
            platformList {
                id
                displayName
                brand {
                    color
                    icon {
                        id
                        __typename
                    }
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
        <PlatformContext.Provider value={{ data, refetch }}>
            {children}
        </PlatformContext.Provider>
    );
}
