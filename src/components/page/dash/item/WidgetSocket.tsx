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

        const { listRooms } = data;

        const ably = new Ably.Realtime({ authUrl: `${import.meta.env.VITE_API_REST_BASE_URL}/realtime/token`, authMethod: 'POST', authHeaders: { Authorization: `Bearer ${getToken()}` } });

        listRooms.forEach(({ id }) => {
            const channel = ably.channels.get(id);

            channel.subscribe((message) => {
                console.log(message);
            });
        });
    }, [data]);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
