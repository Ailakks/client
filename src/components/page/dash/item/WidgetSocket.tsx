import {createContext, useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "./Widget";
import {CookiesContext} from "../../../../wrapper/tool/Cookies";
import {gql, useQuery} from "@apollo/client";
import * as Ably from 'ably';
import {AxiosContext} from "../../../../wrapper/Axios";

export const WidgetSocketContext = createContext(null);

export const MAX_EVENT_HISTORY = 60;

export default function WidgetSocket({ children }) {
    const { client } = useContext(AxiosContext);
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

            channel.subscribe(({ data }) => {
                const { meta: { scope } } = JSON.parse(data);

                if (!scopes.find(({ id }) => id === scope.id)) {
                    return;
                }

                setList((previous) => [...previous.slice(-MAX_EVENT_HISTORY), JSON.parse(data)]);
            });
        });
    }, [data]);

    useEffect(() => {
        client.get('history', { params: { scopes } }).then(({ data }) => {
            const list = data.map(({ event }) => event);

            setList((previous) => [...previous, ...list]);
        });
    }, []);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
