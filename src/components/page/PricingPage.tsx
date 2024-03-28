import {useContext} from "react";
import {LanguageContext} from "../../wrapper/lang/LanguageWrapper";
import List, {ListContext} from "../list/List";
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../query/Query";

export default function PricingPage() {
    const { translate } = useContext(LanguageContext);

    const plans = [
        {
            stripe: 1,
            features: [
                {
                    label: translate("pricing.plan.feature.convert.label")
                }
            ]
        },
        {
            stripe: 1,
            features: [
                {
                    label: translate("pricing.plan.feature.convert.label")
                }
            ]
        },
        {
            stripe: 1,
            features: [
                {
                    label: translate("pricing.plan.feature.convert.label")
                }
            ]
        },
        {
            stripe: 1,
            features: [
                {
                    label: translate("pricing.plan.feature.convert.label")
                }
            ]
        }
    ]

    return (
        <div className="space-y-2">
            <div className="bg-blue-500 px-10 py-20 text-center rounded-xl">
                <h1>{translate("pricing.title")}</h1>
            </div>
            <div className="flex space-x-2">
                <List list={plans} children={<Plan />} />
            </div>
        </div>
    );
}

function Feature() {
    const { item: { label } } = useContext(ListContext);

    return (
        <div className="inline">
            <i className="fa-regular fa-check" />
            <p>{label}</p>
        </div>
    );
}

function Plan() {
    const { item: { features } } = useContext(ListContext);

    return (
        <div className="bg-gray-300 p-5 rounded-xl">
            <List list={features} children={<Feature />} />
            <PriceQuery />
        </div>
    );
}

function PriceQuery() {
    const { item: { stripe } } = useContext(ListContext);

    const request = useQuery(gql`
                query ListPricesFromProduct($product: String!) {
                    query {
                        listPricesFromProduct(payload: { product: $product }) {
                            list {
                                id
                                currency
                                recurring {
                                    interval
                                    count
                                    trial {
                                        days
                                    }
                                    __typename
                                }
                                amount
                                __typename
                            }
                            __typename
                        }
                    }
                }`,
        {
            variables: {
                product: stripe
            }
        }
    );

    return (
        <Query request={request}>
            <PriceList />
        </Query>
    );
}

function PriceList() {
    const { data: { listPricesFromProduct: { list } } } = useContext(QueryContext);

    return (
        <List list={list}><Price /></List>
    );
}

function Price() {
    const { item: { amount, recurring: { interval } } } = useContext(List);

    return (
        <p>{amount}</p>
    );
}