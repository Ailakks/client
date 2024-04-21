import {createContext, useContext} from "react";
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../../components/query/Query";

export const ChannelContext = createContext(null);

export default function ChannelWrapper({ children }) {
    const request = useQuery(gql`
        query {
            channelList {
                platform
                enabled
                username
                link {
                    id
                    __typename
                }
                user {
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
        <ChannelContext.Provider value={{ data, refetch }}>
            {children}
        </ChannelContext.Provider>
    );
}
