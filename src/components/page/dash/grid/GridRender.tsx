import jsonpath from "jsonpath";
import {createContext, useContext, useRef} from "react";
import {LayoutContext} from "./GridView";
import List, {ListContext} from "../../../list/List";
import {ImperativePanelHandle, Panel, PanelGroup} from "react-resizable-panels";
import {GridProviderContext} from "../GridProvider";
import Widget from "../item/Widget";
import ResizeHandle from "../resize/ResizeHandle";

export const PathContext = createContext(null);
export const GridPanelConext = createContext(null);

export default function GridRender() {
    const { layout: { serialize } } = useContext(LayoutContext);

    const parse = JSON.parse(serialize);
    const path = "$";
    const root = jsonpath.value(parse, path);

    return (
        <PathContext.Provider value={{ path, parse }}>
            <PanelGroup direction="horizontal">
                <List list={root}>
                    <Child />
                </List>
            </PanelGroup>
        </PathContext.Provider>
    )
}

function Child() {
    const { path, parse } = useContext(PathContext);
    const { index } = useContext(ListContext);

    const { column, row } = jsonpath.value(parse, `${path}[${index}]`);

    const next = `${path}[${index}].${column ? `column` : `row`}`;

    const ref = useRef<ImperativePanelHandle>(null);

    const data = column ?? row;

    if (!data) {
        return;
    }

    return (
        <PathContext.Provider value={{ path: next }}>
            <GridPanelConext.Provider value={{ ref }}>
                <Panel>
                    <PanelGroup direction={row ? "vertical" : "horizontal"}>
                        <List list={data} separator={<ResizeHandle />}>
                            <Body />
                        </List>
                    </PanelGroup>
                </Panel>
            </GridPanelConext.Provider>
        </PathContext.Provider>
    )
}

function Body() {
    const { path } = useContext(PathContext);
    const { list, widgets } = useContext(GridProviderContext);
    const { index, item: { content, child } } = useContext(ListContext);

    const item = `${path}[${index}]`;
    const next = `${item}.${content ? `content` : `child`}`;

    if (child) {
        return (
            <PathContext.Provider value={{ path: next }}>
                <List list={child}>
                    <Child />
                </List>
            </PathContext.Provider>
        )
    }

    const getComponent = (id) => {
        return list[widgets.map(({ id }) => id).indexOf(id)];
    };

    return (
        <PathContext.Provider value={{ path: item }}>
            <Panel>
                <Widget>
                    {getComponent(content)}
                </Widget>
            </Panel>
        </PathContext.Provider>
    );
}