import {gql, useQuery} from "@apollo/client";
import {useContext} from "react";
import {QueryContext} from "../query/Query";

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
        }`
    );

    return (
        <Body />
    )
}

function Body() {
    const { data: { getFolder: { files } } } = useContext(QueryContext);

    return (
        <p>{JSON.stringify(files)}</p>
    )
}
