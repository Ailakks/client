import {createContext, useContext, useEffect, useState} from "react";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {LayoutContext} from "../grid/GridView";
import {HeaderContext} from "../../../layout/dash/Dash";
import ContextMenu from "../../../context/ContextMenu";
import List, {ListContext} from "../../../list/List";
import Query, {QueryContext} from "../../../query/Query";

export const LayoutSelectorContext = createContext();

export default function LayoutSelector() {
    const [layout, setLayout] = useState();

    const { setSerialize } = useContext(LayoutContext);
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        if (!layout) {
            return;
        }

        setSerialize(JSON.parse(layout.serialize));
    }, [layout]);

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

                setLayout(listLayoutTemplates[0]);
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

                setLayout(listLayouts[0]);
            }
        }
    );

    useEffect(() => {
        setHeader(
            <LayoutSelectorContext.Provider value={{ layout }}>
                <Body />
            </LayoutSelectorContext.Provider>
        );
    }, [layout]);
}

function Body() {
    const { layout } = useContext(LayoutSelectorContext);
    const { translate } = useContext(LanguageContext);

    const sections = [
        {
            id: 'layout',
            child: <LayoutSection />
        },
        {
            id: 'template',
            child: <TemplateSection />
        }
    ];

    return (
        <div className="flex items-center space-x-5">
            <h2 className="space-x-2 items-center text-nowrap">
                <a className="text-white" href="/">{translate("layout.header.name")}</a>
                <label className="main">Beta</label>
            </h2>
            {layout &&
                <ContextMenu list={sections} content={<Section/>}>
                <button>{layout.name}</button>
            </ContextMenu>}
        </div>
    )
}

function Section() {
    const { translate } = useContext(LanguageContext);
    const { item: { id, child } } = useContext(ListContext);

    return (
        <div>
            <div className="py-2 px-4">
                <p>{translate(`layout.header.selector.dropdown.${id}.title`)}</p>
            </div>
            {child}
        </div>
    )
}

function TemplateSection() {
    const request = useQuery(gql`
        query {
            listLayoutTemplates {
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
            <TemplateList />
        </Query>
    )
}

function TemplateList() {
    const { data: { listLayoutTemplates } } = useContext(QueryContext);

    return (
        <List list={listLayoutTemplates}>
            <Item />
        </List>
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
    const { translate } = useContext(LanguageContext);
    const { data: { listLayouts } } = useContext(QueryContext);

    return (
        <div>
            <List list={listLayouts}>
                <Item />
            </List>
            <button className="flex space-x-2 py-2 px-4 items-center">
                <i className="fa-light fa-plus w-5" />
                <p>{translate(`layout.header.selector.dropdown.layout.create.label`)}</p>
            </button>
        </div>
    )
}

function Item() {
    const { translate } = useContext(LanguageContext);
    const { item: { id, name } } = useContext(ListContext);

    return (
        <button className="flex space-x-2 py-2 px-4 items-center">
            <i className="fa-light fa-grid-2 w-5"/>
            <p>{name ?? translate(`layout.header.selector.dropdown.template.${id}.name`)}</p>
        </button>
    )
}