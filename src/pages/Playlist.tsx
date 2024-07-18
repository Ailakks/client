import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {Track} from "../components/item/Track";
import {LanguageContext} from "../components/wrapper/lang/Language";
import Checkbox from "../components/input/Checkbox";

export function Playlist() {
    const { useClient } = useContext(AxiosContext);
    const { translate } = useContext(LanguageContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });

    return (
        <Query request={request}>
            {({ tracks }) => {
                return (
                    <table className="w-full">
                        <thead className="sticky top-0 h-14 bg-gray-100">
                        <tr>
                            <th/>
                            <th>
                                <p>{translate("table.track.head.title")}</p>
                            </th>
                            <th>
                                <p>{translate("table.track.head.album")}</p>
                            </th>
                            <th>
                                <p>{translate("table.track.head.release")}</p>
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <List list={tracks}><Item/></List>
                        </tbody>
                    </table>
                )
            }}
        </Query>
    )
}

function Item() {
    const {item: {track: {app, data}}} = useContext(ListContext);

    return (
        <Track app={app} track={data}/>
    )
}
