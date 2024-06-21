import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/Axios";
import Query from "../components/query/Query";

export default function Playlist() {
    const { useClient } = useContext(AxiosContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });

    return (
        <Query request={request}>
            {(response, refetch) => {
                return (
                    <p>{JSON.stringify(response)}</p>
                )
            }}
        </Query>
    )
}
