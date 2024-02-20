import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../query/Query";
import {useContext} from "react";

export default function Home() {
    const request = useQuery(gql`
        query {
            getMainVault {
                id
                name
                user {
                    id
                    __typename
                }
                root {
                    id
                    __typename
                }
                __typename
            }
        }`
    );

    return (
        <Query request={request}>
            <Body />
        </Query>
    );
}

function Body() {
    const { data: { getMainVault: { id, root } } } = useContext(QueryContext);

    return (
        <p>{id}</p>
    )
}
