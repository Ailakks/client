import { useContext, useEffect } from "react";
import { WidgetDataContext } from "../../item/Widget";
import { gql, useQuery } from "@apollo/client";
import Query, { QueryContext } from "../../../../query/Query";
import WidgetSocket from "../../item/WidgetSocket";
import List, { ListContext } from "../../../../list/List";

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
                <SubathonData />
            </WidgetSocket>
        )
    }
}

function SubathonData() {
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
            <SubathonList />
        </Query>
    )
}

function SubathonList({ children }) {
    const { data: { listSubathon } } = useContext(QueryContext);

    return (
        <List list={listSubathon}>
            <SubathonItem />
        </List>
    )
}

function SubathonItem() {
    const { item: { id } } = useContext(ListContext);

    const request = useQuery(gql`
        query($id: String!) {
            getSubathonStatus(payload: {
                id: $id
            }) {
                end_time
                __typename
            }
        }`,
        {
            variables: {
                id
            }
        }
    );

    return (
        <Query request={request}>
            <SubathonCounter />
        </Query>
    )
}

function SubathonCounter() {
    const { data: { getSubathonStatus: { end_time } } } = useContext(QueryContext);

    return (
        <p>{end_time}</p>
    )
}
