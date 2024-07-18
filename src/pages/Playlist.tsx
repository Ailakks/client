import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {Track} from "../components/item/Track";
import {LanguageContext} from "../components/wrapper/lang/Language";

export function Playlist() {
    const { useClient } = useContext(AxiosContext);
    const { translate } = useContext(LanguageContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });

    return (
        <Query request={request}>
            {({ tracks }) => {
                return (
                    <table className="flex flex-col space-y-2">
                        <thead className="sticky top-0 h-14 bg-gray-900 shadow-[0px_1px] shadow-gray-300">
                        <tr className="text-left">
                            <th>
                                <Checkbox status={checked} change={toggleAll} icon={selected.length > 0 && `fa-solid fa-hyphen`}/>
                            </th>
                            <th/>
                            <th>{translate("table.track.head.image")}</th>
                            <th>{translate("table.track.head.name")}</th>
                            <th>{translate("table.track.head.album")}</th>
                            <th>{translate("table.track.head.duration")}</th>
                            <th/>
                        </tr>
                        </thead>
                        <List list={tracks}><Item/></List>
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
