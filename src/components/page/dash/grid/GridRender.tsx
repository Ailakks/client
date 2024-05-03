import jsonpath from "jsonpath";
import {createContext, useContext, useRef} from "react";
import {LayoutContext} from "./GridView";
import List, {ListContext} from "../../../list/List";
import GridResizePanel from "../resize/ResizePanel";
import {ImperativePanelHandle, Panel, PanelGroup} from "react-resizable-panels";
import {GridProviderContext} from "../GridProvider";
import Widget from "../item/Widget";
import ResizeHandle from "../resize/ResizeHandle";

export const PathContext = createContext(null);
export const GridPanelConext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);

    const path = "$";

    const root = jsonpath.value(layout, path);

    return (
        <PathContext.Provider value={{ path }}>
            <PanelGroup direction="horizontal">
                <List list={root} separator={<ResizeHandle />}>
                    <Child />
                </List>
            </PanelGroup>
        </PathContext.Provider>
    )
}

function Child() {
    const { item: { column, row } } = useContext(ListContext);

    const ref = useRef<ImperativePanelHandle>(null);

    return (
        <GridPanelConext.Provider value={{ ref }}>
            <Panel>
                <PanelGroup direction={column ? "vertical" : "horizontal"}>
                    <List list={column ?? row} separator={<ResizeHandle />}>
                        <Body />
                    </List>
                </PanelGroup>
            </Panel>
        </GridPanelConext.Provider>
    )
}

function Body() {
    const { list, widgets } = useContext(GridProviderContext);

    const { item: { content, child } } = useContext(ListContext);

    if (child) {
        return (
            <List list={child}>
                <Child />
            </List>
        )
    }

    const getComponent = (id) => {
        return list[widgets.map(({ id }) => id).indexOf(id)];
    };

    return (
        <Panel>
            <Widget>
                {getComponent(content)}
            </Widget>
        </Panel>
    );
}