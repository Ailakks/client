import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query, {QueryContext} from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {LanguageContext} from "../components/wrapper/api/Language";
import ContextMenu from "../components/context/ContextMenu";
import {AppContext} from "../components/wrapper/app/App";

export function Search() {
    const { useClient } = useContext(AxiosContext);

    const request = useClient({ url: `app` });

    return (
        <div>
            <Query request={request}>
                {(response) => {
                    return (
                        <ContextMenu popup={<List list={response}><App /></List> }>
                            <p>App</p>
                        </ContextMenu>
                    )
                }}
            </Query>
            <Result />
        </div>
    )
}

function App() {
    const { item: { app } } = useContext(ListContext);

    const { setApp } = useContext(AppContext);

    const set = () => {
        setApp(app);
    };

    return (
        <div onClick={set}>
            <p>{app.name}</p>
        </div>
    )
}

function Result() {
    const { app } = useContext(AppContext);
    const { useClient } = useContext(AxiosContext);
    const { state: { query } } = useLocation();

    const request = useClient({}, { manual: true });
    const [{ data }, refetch] = request;

    useEffect(() => {
        if (!app) {
            return;
        }

        const { url } = app;

        refetch({ url: `${url}/search`, params: { query } });
    }, [app, query]);

    if (data) {
        return;
    }

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
