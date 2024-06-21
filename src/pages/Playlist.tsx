import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/Axios";
import Query from "../components/query/Query";
import List, {ListContext} from "../components/list/List";

export default function Playlist() {
    const { useClient } = useContext(AxiosContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });

    return (
        <Query request={request}>
            {({ tracks }, refetch) => {
                return (
                    <List list={tracks}><Item /></List>
                )
            }}
        </Query>
    )
}


function Item() {
    const { item: { track: { data: { name, album: { image: { url } } } } } } = useContext(ListContext);

    return (
        <div className="flex space-x-4 items-center">
            <img className="h-14 rounded-md" alt={name} src={url} />
            <p>{name}</p>
        </div>
    )
}
