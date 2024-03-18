import IntegrationMeta from "../item/IntegrationMeta";
import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import List from "../list/List";
import Tabs from "../native/Tabs";

export default function FileSpreadsheet() {
    const request = useQuery(gql`
        query {
            listTemplates {
                id
                name
                keys {
                    id
                    name
                    __typename
                }
                __typename
            }
        }`
    );

    return (
        <Query request={request}>
            <Body/>
        </Query>
    );
}

function Body() {
    const { data: { listTemplates } } = useContext(QueryContext);

    return (
        <Tabs>
            <List list={listTemplates}></List>
        </Tabs>
    )
}

function TemplateTab() {

}
