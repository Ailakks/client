import {createContext, useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "./Widget";
import {ChannelContext} from "../../../../wrapper/api/Channel";
import {CookiesContext} from "../../../../wrapper/tool/Cookies";
import {AxiosContext} from "../../../../wrapper/Axios";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import * as Ably from 'ably';

export const WidgetSocketContext = createContext(null);

export const MAX_EVENT_HISTORY = 60;

export default function WidgetSocket({ children }) {
    const { client } = useContext(AxiosContext);
    const { getToken } = useContext(CookiesContext);

    const { data: { channelList } } = useContext(ChannelContext);
    const { metadata: { scopes } } = useContext(WidgetDataContext);

    const [list, setList] = useState([]);

    const [request] = useLazyQuery(gql`
                query GetRealtimeToken($platform: String!, $username: String!, $scopes: [ScopeData!]!) {
                    getRealtimeToken(payload: {
                        platform: $platform,
                        username: $username,
                        scopes: $scopes
                    }) {
                        token
                        __typename
                    }
                }`,
    );

    useEffect(() => {
        channelList.forEach(async ({ platform, username }) => {
            const { data } = await request({
                variables: {
                    platform: platform,
                    username: username,
                    scopes: scopes
                }
            });

            const login = () => {
                const { getRealtimeToken: { token } } = data;

                return token;
            }

            const ably = new Ably.Realtime({ authCallback: login });
        });
    }, []);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
