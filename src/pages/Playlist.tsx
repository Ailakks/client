import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {Track} from "../components/item/Track";

export default function Playlist() {
    const { useClient } = useContext(AxiosContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });

    return (
        <Query request={request}>
            {({ tracks }) => {
                return (
                    <List list={tracks}><Item /></List>
                )
            }}
        </Query>
    )
}

function Item() {
    const { item: { track: { app, data } } } = useContext(ListContext);

    return (
        <Track app={app} track={data} />
    )
}
