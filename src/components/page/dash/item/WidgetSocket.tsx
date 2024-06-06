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

    const { data } = useQuery(gql`
        query GetRealtimeToken {
            getRealtimeToken {
                token
                __typename
            }
        }`
    );

    useEffect( () => {
        //const roomId = JSON.stringify({ platform, username, scopes });

        const login = () => {
            return data;
        };

        const ably = new Ably.Realtime({ authCallback: login });

        console.log('Connected to Ably!');
    }, [data]);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
