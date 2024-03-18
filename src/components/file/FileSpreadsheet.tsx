import {createContext, useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import List, {ListContext} from "../list/List";
import Tabs from "../native/Tabs";
import Tab from "../native/Tab";
import TabContent from "../native/TabContent";
import IntegrationMeta from "../item/IntegrationMeta";
import {ScopesDataContext} from "../context/Scopes";

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
    const { item } = useContext(ListContext);

    const { name } = item;

    return (
        <Tab>
            <p>{name}</p>
            <TabContent>
                <TemplateContext.Provider value={{ item }}>
                    <TemplateSheet />
                </TemplateContext.Provider>
            </TabContent>
        </Tab>
    )
}

function TemplateSheet() {
    const { item: { id } } = useContext(ScopesDataContext);

    const request = useQuery(gql`
        query GenerateSheet($file: String!) {
            generateSheet(payload: {
                file: $file
            }) {
                id
                file {
                    id
                    __typename
                }
                result {
                    list {
                        code
                        quantity
                        tax_amount
                        tax_rate
                        price_unit
                        price_total
                        __typename
                    }
                    __typename
                }
                __typename
            }
        }`,
        {
            variables: {
                file: id
            }
        }
    );

    return (
        <Query request={request}>
            <Body/>
        </Query>
    );
}