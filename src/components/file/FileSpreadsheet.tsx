import {createContext, useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import List, {ListContext} from "../list/List";
import Tabs from "../native/Tabs";
import Tab from "../native/Tab";
import TabContent from "../native/TabContent";
import IntegrationMeta from "../item/IntegrationMeta";
import {ScopesDataContext} from "../context/Scopes";
import {PopupContext} from "../../wrapper/ui/PopupProvider";
import CreateTemplatePopup from "../ui/popup/content/CreateTemplatePopup";
import TabDefault from "../native/TabDefault";
import {AxiosContext} from "../../wrapper/Axios";
import {DownloadContext} from "../../wrapper/tool/Download";

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

    const { setCurrent } = useContext(PopupContext);

    const add = () => {
        setCurrent(<CreateTemplatePopup />);
    };

    return (
        <Tabs>
            <List list={listTemplates}><TemplateTab /></List>
            <button className="tab flex space-x-2 items-center px-6 py-1" onClick={add}>
                <i className="fa-regular fa-plus" />
                <p>New</p>
            </button>
            <TabDefault>
                <p>Select a template to see the summary</p>
            </TabDefault>
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
                    list {
                        id
                        name
                        value {
                            string
                            number
                        }
                        __typename
                    }
                }
                __typename
            }
        }`,
        {
            variables: {
                sheet,
                template
            }
        }
    );

    return (
        <div className="w-full space-y-5">
            <div className="flex justify-between items-center">
                <p>File spreadsheet</p>
                <DownloadExcelButton/>
            </div>
            <Query request={request}>
                <ExportTable/>
            </Query>
        </div>
    );
}

function DownloadExcelButton() {
    const {client} = useContext(AxiosContext);
    const {download} = useContext(DownloadContext);

    const {item: {id: template}} = useContext(TemplateContext);
    const {data: {generateSheet: {id: sheet}}} = useContext(QueryContext);

    const handle = async () => {
        const { data } = await client.post(`export`, { sheet, template }, { responseType: 'arraybuffer' });
        const blob = new Blob([data]);

        download(`Export.xlsx`, blob);
    }

    return (
        <button className="main icon" onClick={handle}>
            <i className="fa-regular fa-arrow-down-to-bracket"/>
            <p>Download as Excel</p>
        </button>
    )
}

function ExportTable() {
    const {item: {keys}} = useContext(TemplateContext);
    const {data: {exportSheet: {items}}} = useContext(QueryContext);

    return (
        <div className="w-full bg-gray-300 p-8 rounded-xl">
            <table className="w-full text-white">
                <thead>
                <tr className="text-left">
                    <List list={keys}><Head/></List>
                </tr>
                </thead>
                <tbody className="divide-y-1 divide-gray-500">
                <List list={items}><Row/></List>
                </tbody>
            </table>
        </div>
    )
}

function Head() {
    const { item: { name } } = useContext(ListContext);

    return (
        <th className="pb-5">{name}</th>
    )
}

function Row() {
    const { item: { list } } = useContext(ListContext);

    return (
        <tr>
            <List list={list}><Item/></List>
        </tr>
    )
}

function Item() {
    const { item: { value: { string, number } } } = useContext(ListContext);

    return (
        <td className="py-3">
            <p>{string ?? number ?? `—`}</p>
        </td>
    )
}