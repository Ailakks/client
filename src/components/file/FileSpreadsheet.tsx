import {createContext, useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import List, {ListContext} from "../list/List";
import Tabs from "../native/Tabs";
import Tab from "../native/Tab";
import TabContent from "../native/TabContent";
import IntegrationMeta from "../item/IntegrationMeta";

export const TemplateContext = createContext();

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
        <IntegrationMeta name="Spreadsheet">
            <Query request={request}>
                <Body/>
            </Query>
        </IntegrationMeta>
    );
}

function Body() {
    const { data: { listTemplates } } = useContext(QueryContext);

    return (
        <Tabs>
            <List list={listTemplates}><TemplateTab /></List>
        </Tabs>
    )
}

function TemplateTab() {
    const { item: { id, name } } = useContext(ListContext);

    return (
        <Tab>
            <p>{name}</p>
            <TabContent>
                <TemplateContext.Provider value={{ id }}>

                </TemplateContext.Provider>
            </TabContent>
        </Tab>
    )
}
