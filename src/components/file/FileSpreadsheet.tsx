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
                    key
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
                    <FileSheet />
                </TemplateContext.Provider>
            </TabContent>
        </Tab>
    )
}

function FileSheet() {
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
            <FileExport/>
        </Query>
    );
}


function FileExport() {
    const { item: { id: template } } = useContext(TemplateContext);
    const { data: { generateSheet: { id: sheet } } } = useContext(QueryContext);

    const request = useQuery(gql`
        query ExportSheet($sheet: String!, $template: String!) {
            exportSheet(payload: {
                sheet: $sheet,
                template: $template
            }) {
                items {
                    id
                    list {
                        id
                        key
                        name
                        value {
                            string
                            number
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
            __typename
        }`,
        {
            variables: {
                sheet,
                template
            }
        }
    );

    return (
        <Query request={request}>
            <ExportTable/>
        </Query>
    );
}

function ExportTable() {
    const { item: { keys } } = useContext(TemplateContext);
    const { data } = useContext(QueryContext);

    return (
        <table className="w-full text-white [&>*>*>*:first-child]:pl-5 [&>*>*>*:last-child]:pr-5">
            <thead>
            <tr className="text-left">
                <List list={keys}><Head /></List>
            </tr>
            </thead>
            <tbody>
            <p>{console.log(data)}</p>
            </tbody>
        </table>
    )
}

function Head() {
    const { item: { name } } = useContext(ListContext);

    return (
        <th>{name}</th>
    )
}

function Row() {
    const { item } = useContext(ListContext);

    return (
        <tr>
            <p>{JSON.stringify(item.list)}</p>
        </tr>
    )
}

function Item() {
    const { item } = useContext(ListContext);

    return (
        <td>
            <p>{JSON.stringify(item)}</p>
        </td>
    )
}