import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../query/Query";
import {useContext} from "react";
import Folder from "../data/Folder";

export default function HomePage() {
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
    const { data: { getMainVault: { root: { id } } } } = useContext(QueryContext);

    return (
        <Folder id={id} />
    )
}
