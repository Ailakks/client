import { useContext, useEffect } from "react";
import { WidgetDataContext } from "../../item/Widget";
import { gql, useQuery } from "@apollo/client";
import Query, { QueryContext } from "../../../../query/Query";
import WidgetSocket from "../../item/WidgetSocket";

enum EventType {
    SUBSCRIPTION = 'subscription',
    GIFT = 'gift'
}

const list = {
    [EventType.SUBSCRIPTION]: {
        icon: "fa-regular fa-sparkles",
        tags: [
            {
                id: "user",
                icon: "fa-regular fa-user",
                value: (( { author: { displayName } }) => displayName)
            },
            {
                id: "plan",
                icon: "fa-regular fa-star",
                value: (({ subscription: { plan } }) => !isNaN(plan) ? plan / 1000 : plan)
            },
            {
                id: "history",
                icon: "fa-regular fa-clock",
                value: (({ subscription: { period: { history } } }) => history)
            },
            {
                id: "streak",
                icon: "fa-regular fa-bolt",
                value: (({ subscription: { period: { streak } } }) => streak)
            }
        ]
    }
};

export default function SubathonWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'subathon', name: 'Subathon', icon: 'fa-regular fa-timer', scopes: ["donation", "gift", "subscription"], platforms: ["youtube", "twitch"] });
    }, []);

    if (metadata) {
        return (
            <WidgetSocket>
                <Data />
            </WidgetSocket>
        )
    }
}

function Data() {
    const request = useQuery(gql`
        query {
            listSubathon {
                id
                user {
                    id
                }
                name,
                started_at,
                initial_count
                __typename
            }
        }`
    );

    return (
        <Query request={request}>
            <List />
        </Query>
    )
}

function List({ children }) {
    const { data } = useContext(QueryContext);

    return (
        <p>{JSON.stringify(data)}</p>
    )
}
