import IntegrationMeta from "../item/IntegrationMeta";
import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import {ScopesDataContext} from "../context/Scopes";
import List, {ListContext} from "../list/List";

export default function FileSpreadsheet() {
    const {item: {id}} = useContext(ScopesDataContext);

    const request = useQuery(gql`
                query Login($file: String!) {
                    generateSheet(payload: {
                        file: $file,
                    }) {
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
                }`, {
            variables: {
                file: id
            }
        }
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
    const { data: { generateSheet: { result: { list } } } } = useContext(QueryContext);

    return (
        <table>
            <thead>
            <tr>
            </tr>
            </thead>
            <tbody>
            <tr>
                <List list={list}><Item /></List>
            </tr>
            </tbody>
        </table>
    )
}

function Item() {
    const { item } = useContext(ListContext);

    return (
        <th>
            {
                    Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                        <p>{value}</p>
                    </div>
                ))
            }
        </th>
    )
}