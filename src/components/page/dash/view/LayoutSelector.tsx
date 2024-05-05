import {useContext, useEffect} from "react";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {LayoutContext} from "../grid/GridView";
import {HeaderContext} from "../../../layout/dash/Dash";
import ContextMenu from "../../../context/ContextMenu";
import List, {ListContext} from "../../../list/List";
import Query, {QueryContext} from "../../../query/Query";

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

    const sections = [
        {
            id: 'templates'
        },
        {
            id: 'layouts',
            child: <LayoutSection />
        }
    ];

    return (
        <div className="flex items-center space-x-5">
            <h2 className="space-x-2 items-center text-nowrap">
                <a className="text-white" href="/">{translate("layout.header.name")}</a>
                <label className="main">Beta</label>
            </h2>
            <ContextMenu list={sections} content={<Item/>}>
                <button>Layout</button>
            </ContextMenu>
        </div>
    )
}

function Item() {
    const { translate } = useContext(LanguageContext);
    const { item: { id, child } } = useContext(ListContext);

    return (
        <div className="p-2">
            <p>{translate(`layout.selector.dropdown.${id}`)}</p>
            {child}
        </div>
    )
}

function LayoutSection() {
    const request = useQuery(gql`
        query {
            listLayouts {
                id
                name
                serialize
                selected
                __typename
            }
        }`
    );

    return (
        <Query request={request}>
            <LayoutList />
        </Query>
    )
}

function LayoutList() {
    const { data: { listLayouts } } = useContext(QueryContext);

    return (
        <List list={listLayouts}>
            <LayoutItem />
        </List>
    )
}

function LayoutItem() {
    const { item: { name } } = useContext(ListContext);

    return (
        <button className="p-2">
            <p>{name}</p>
        </button>
    )
}