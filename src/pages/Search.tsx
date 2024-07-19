import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query, {QueryContext} from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {LanguageContext} from "../components/wrapper/api/Language";
import ContextMenu from "../components/context/ContextMenu";

export function Search() {
    const { useClient } = useContext(AxiosContext);

    const request = useClient({ url: `app` });

    return (
        <Query request={request}>
            {(response) => {
                return (
                    <ContextMenu popup={<List list={response}><App /></List> }>
                        <p>App</p>
                    </ContextMenu>
                )
            }}
        </Query>
    )
}

function App() {
    const { item: { app } } = useContext(ListContext);

    return (
        <div onClick={}>
            <p>{app.name}</p>
        </div>
    )
}

function Result() {
    const { useClient } = useContext(AxiosContext);

    const { state: { query } } = useLocation();

    const request = useClient({ url: `search`, params: { query } });

    return (
        <Query request={request}>
            <ResultList />
        </Query>
    )
}

function ResultList() {
    const { translate } = useContext(LanguageContext);

    const { response: { track: { list } }, refetch } = useContext(QueryContext);

    useEffect(() => {
        refetch();
    }, []);

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
            <List list={list}><Item/></List>
            </tbody>
        </table>
    )
}
