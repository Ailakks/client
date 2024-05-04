import {useContext, useEffect} from "react";
import {HeaderContext} from "../../../layout/dash/Dash";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import {gql, useQuery} from "@apollo/client";
import {LayoutContext} from "../grid/GridView";


export default function LayoutSelector() {
    const { setHeader } = useContext(HeaderContext);

    const { setLayout } = useContext(LayoutContext);

    useQuery(gql`
        query {
            listLayoutTemplates {
                id
                name
                serialize
                __typename
            }
        }`,
        {
            onCompleted: ({ listLayoutTemplates }) => {
                setLayout(listLayoutTemplates[0].serialize)
            }
        }
    );

    useEffect(() => {
        setHeader(<Header />);
    }, []);
}

function Header() {
    return (
        <p>test</p>
    )
}

function Body() {
    const { translate } = useContext(LanguageContext);

    return (
        <div className="flex items-center space-x-5">
            <h2 className="space-x-2 items-center text-nowrap">
                <a className="text-white" href="/">{translate("layout.header.name")}</a>
                <label className="main">Beta</label>
            </h2>
            <button>Layout</button>
        </div>
    )
}
