import {useContext} from "react";
import {LanguageContext} from "../wrapper/lang/Language";
import Query from "../query/Query";
import {AxiosContext} from "../wrapper/api/Api";
import List from "../list/List";

export default function Side() {
    const { useClient } = useContext(AxiosContext);
    const { translate } = useContext(LanguageContext);

    const request = useClient('playlist');

    return (
        <div className="space-y-4">
            <h1>{translate("layout.side.library.title")}</h1>
            <Query request={request}>
                {(data) => {
                    return (
                        <div className="space-y-2">
                            <List list={data}>
                                {(key, item) => {
                                    const { id, name, tracksCount } = item;

                                    return (
                                        <a className="flex flex-col rounded-md hover:bg-gray-600 hover:shadow-[0px_0px_0px_10px] hover:shadow-gray-600" href={`/playlist/${id}`}>
                                            <p>{name}</p>
                                            <p>{translate("layout.side.library.playlist.subtitle", [tracksCount])}</p>
                                        </a>
                                    )
                                }}
                            </List>
                        </div>
                    )
                }}
            </Query>
        </div>
    )
}
