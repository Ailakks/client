import {useContext} from "react";
import {LanguageContext} from "../../wrapper/lang/LanguageWrapper";
import List, {ListContext} from "../list/List";

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
        }
    ]

    return (
        <div>
            <div className="bg-blue-500 px-10 py-20 text-center rounded-xl">
                <h1>{translate("pricing.title")}</h1>
            </div>
            <List list={plans} children={<Plan />} />
        </div>
    );
}

function Plan() {
    const { item: { stripe, features } } = useContext(ListContext);

    return (
        <div>
            <List list={features} children={<Feature />} />
        </div>
    );
}

function Feature() {
    const { item: { label } } = useContext(ListContext);

    return (
        <div>
            <p>{label}</p>
        </div>
    );
}
