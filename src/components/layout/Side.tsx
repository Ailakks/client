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
        <div>
            <h1>{translate("layout.side.library.title")}</h1>
            <Query request={request}>
                {(data) => {
                    return (
                        <List list={data}>
                            {(key, item) => {
                                return (
                                    <p>{JSON.stringify(item)}</p>
                                )
                            }}
                        </List>
                    )
                }}
            </Query>
        </div>
    )
}
