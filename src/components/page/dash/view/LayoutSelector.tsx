import {useContext, useEffect} from "react";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {LayoutContext} from "../grid/GridView";
import {HeaderContext} from "../../../layout/dash/Dash";

export default function LayoutSelector() {
    const { setLayout } = useContext(LayoutContext);
    const { setHeader } = useContext(HeaderContext);

    const [getTemplates] = useLazyQuery(gql`
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
                if (listLayoutTemplates.length < 1) {
                    return;
                }

                setLayout(JSON.parse(listLayoutTemplates[0].serialize));
            }
        }
    );

    useQuery(gql`
                query {
                    listLayouts {
                        id
                        name
                        serialize
                        selected
                        __typename
                    }
                }`,
        {
            onCompleted: ({ listLayouts }) => {
                if (listLayouts.length < 1) {
                    getTemplates();

                    return;
                }

                setLayout(JSON.parse(listLayouts[0].serialize));
            }
        }
    );

    useEffect(() => {
        setHeader(<Body />);
    }, []);
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
