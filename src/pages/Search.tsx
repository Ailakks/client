import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AxiosContext} from "../components/wrapper/api/Api";
import Query, {QueryContext} from "../components/query/Query";
import List, {ListContext} from "../components/list/List";
import {LanguageContext} from "../components/wrapper/api/Language";
import ContextMenu from "../components/context/ContextMenu";
import {AppContext} from "../components/wrapper/app/App";
import {Track} from "../components/item/Track";

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
           <p>eee</p>
        </Query>
    )
}

function ResultList() {
    const { response } = useContext(QueryContext);

    if (!response) {
        return null;
    }

    const { track: { list } } = response;

    return (
        <p>{JSON.stringify(list)}</p>
    )
}
