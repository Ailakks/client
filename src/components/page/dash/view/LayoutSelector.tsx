import {createContext, useContext, useEffect, useState} from "react";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {LayoutContext} from "../grid/GridView";
import {HeaderContext} from "../../../layout/dash/Dash";
import ContextMenu from "../../../context/ContextMenu";
import List, {ListContext} from "../../../list/List";
import Query, {QueryContext} from "../../../query/Query";
import {AppHead} from "../../../layout/app/Header";

export const LayoutSelectorContext = createContext();

export default function LayoutSelector() {
    const [previous, setPrevious] = useState(null);

    const [layout, setLayout] = useState();

    const { serialize, setSerialize } = useContext(LayoutContext);
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        if (!layout) {
            return;
        }

        setPrevious(JSON.parse(layout.serialize));
    }, [layout]);

    useEffect(() => {
        setSerialize(previous);
    }, [previous]);

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
            <LayoutSelectorContext.Provider value={{ layout, serialize, previous }}>
                <Body />
            </LayoutSelectorContext.Provider>
        );
    }, [layout, serialize]);
}

function Body() {
    const { layout, serialize, previous } = useContext(LayoutSelectorContext);
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

    if (!layout) {
        return <AppHead />;
    }

    return (
        <div className="inline !space-x-6 text-nowrap">
            <p>{translate("layout.header.section.stream.title")}</p>
            <div className="inline">
                <ContextMenu list={sections} content={<Section/>}>
                    <button className="secondary inline">
                        <p>{layout.name}</p>
                        <i className="fa-regular fa-angle-down"/>
                    </button>
                </ContextMenu>
                <button className="secondary inline">
                    <i className="fa-regular fa-plus" />
                    <p>{translate("layout.header.layout.create.label")}</p>
                </button>
            </div>
            {serialize !== previous > 1 &&
                <div className="inline">
                    <p>Has hecho cambios</p>
                    <button className="secondary inline">
                        <i className="fa-regular fa-bookmark" />
                        <p>Guardar</p>
                    </button>
                </div>
            }
        </div>
    )
}

function Section() {
    const {translate} = useContext(LanguageContext);
    const {item: {id, child}} = useContext(ListContext);

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
        <div className="divided">
            <List list={listLayoutTemplates}>
                <Item />
            </List>
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
    const { translate } = useContext(LanguageContext);
    const { data: { listLayouts } } = useContext(QueryContext);

    return (
        <div className="list">
            <List list={listLayouts}>
                <Item/>
            </List>
            <button className="flex space-x-2 py-2 px-4 items-center hover:bg-gray-300">
                <i className="fa-light fa-plus w-5"/>
                <p>{translate(`layout.header.selector.dropdown.layout.create.label`)}</p>
            </button>
        </div>
    )
}

function Item() {
    const {translate} = useContext(LanguageContext);
    const {item: {id, name}} = useContext(ListContext);

    return (
        <button className="flex space-x-2 py-2 px-4 items-center hover:bg-gray-300">
            <i className="fa-light fa-grid-2 w-5"/>
            <p>{name ?? translate(`layout.header.selector.dropdown.template.${id}.name`)}</p>
        </button>
    )
}