import {gql, useQuery} from "@apollo/client";
import Query from "../query/Query";
import ListView from "./ListView";
import Scopes from "../context/Scopes";
import NotFoundFallback from "../page/fallback/NotFoundFallback";

export default function Folder({ id, query }) {
    const request = useQuery(gql`
        query GetFolder($id: String!, $query: QueryDto!) {
            getFolder(payload: {
                id: $id,
                query: $query
            }) {
                id
                files {
                    id
                    date
                    name
                    source {
                        uuid
                        path
                        storage {
                            tag
                            url
                            key
                            bucket
                            __typename
                        }
                        meta {
                            name
                            mime
                            size
                            __typename
                        }
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
                removed
                __typename
            }
        }`,
        {
            variables: {
                id: id,
                query: query
            }
        }
    );

    return (
        <Query request={request} fallback={<NotFoundFallback />}>
            <Body />
        </Query>
    )
}

function Body() {
    return (
        <Scopes scopes={[]}>
            <ListView />
        </Scopes>
    )
}
