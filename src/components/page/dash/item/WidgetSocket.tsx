import {createContext, useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "./Widget";
import {CookiesContext} from "../../../../wrapper/tool/Cookies";
import {gql, useQuery} from "@apollo/client";
import * as Ably from 'ably';

export const WidgetSocketContext = createContext(null);

export const MAX_EVENT_HISTORY = 60;

export default function WidgetSocket({ children }) {
    const { getToken } = useContext(CookiesContext);

    const { metadata: { scopes } } = useContext(WidgetDataContext);

    const [list, setList] = useState([]);

    const { data } = useQuery(gql`
        query ListRooms($scopes: [String!]!) {
            listRooms(payload: {
                scopes: $scopes
            }) {
                id
                channel {
                    id
                    platform
                    handle
                    __typename
                }
                scope
                __typename
            }
        }`,
        {
            variables: {
                scopes: scopes
            }
        }
    );

    useEffect(() => {
        if (!data) {
            return;
        }

        const ably = new Ably.Realtime({ authUrl: `${import.meta.VITE_API_REST_BASE_URL}/realtime/token`, authMethod: 'POST', authHeaders: { Authorization: `Bearer ${getToken()}` } });

        const channel = ably.channels.get("6662077cfe282c8d769c9209");

        channel.subscribe((message) => {
            console.log(message);
        });
    }, [data]);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
