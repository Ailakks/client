import IntegrationMeta from "../item/IntegrationMeta";
import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {gql, useQuery} from "@apollo/client";

export default function FileSpreadsheet() {
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
        }`
    );

    return (
        <Query request={request}>
            <Body />
        </Query>
    );
}

function Body() {
    const { data } = useContext(QueryContext);

    return (
        <IntegrationMeta name="Spreadsheet">
            <p>{JSON.stringify(data)}</p>
        </IntegrationMeta>
    )
}
