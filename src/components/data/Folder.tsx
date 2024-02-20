import {gql, useQuery} from "@apollo/client";
import Query from "../query/Query";
import ListView from "./ListView";

export default function Folder({ id }) {
    const request = useQuery(gql`
        query GetFolder($id: String!) {
            getFolder(payload: {
                id: $id,
            }) {
                id
                files {
                    id
                    date
                    name
                    source {
                        uuid
                        name
                        path
                        url
                        mime
                        size
                        __typename
                    }
                    removed
                    __typename
                }
                filesAmount
                folders {
                    id
                    name
                    __typename
                }
                date
                name
                parent {
                    id
                    name
                    __typename
                }
                removed
                __typename
            }
        }`,
        {
            variables: {
                id: id
            }
        }
    );

    return (
        <Query request={request}>
            <Body />
        </Query>
    )
}

function Body() {
    return (
        <ListView />
    )
}
