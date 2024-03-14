import IntegrationMeta from "../item/IntegrationMeta";
import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";
import {ScopesDataContext} from "../context/Scopes";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function FileSpreadsheet() {
    const { item: { id } } = useContext(ScopesDataContext);

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
        }`, { variables: {
            file: id
        } }
    );

    return (
        <IntegrationMeta name="Spreadsheet">
            <Query request={request}>
                <Body />
            </Query>
        </IntegrationMeta>
    );
}

function Body() {
    const { data: { generateSheet: { result: { list } } } } = useContext(QueryContext);

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "role",
            label: "ROLE",
        },
        {
            key: "status",
            label: "STATUS",
        },
    ];

    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader>
                <TableColumn>
                    <p>header</p>
                </TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <p>body</p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
