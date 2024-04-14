import {createContext, useContext, useRef, useState} from "react";
import {ImperativePanelHandle, PanelGroup} from "react-resizable-panels";
import jsonpath from "jsonpath";
import {LayoutContext} from "./GridView";
import List, {ListContext} from "../../../list/List";
import Widget from "../item/Widget";
import GridResizePanel from "../resize/ResizePanel";
import {GridProviderContext} from "../GridProvider";

export const PathContext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };

    const next = jsonpath.value(layout, path);

    if (!next) {
        return;
    }

    return (
        <List list={next}>
            <Item />
        </List>
    )
}

function Item() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };
    const { index } = useContext(ListContext);

    const { list, widgets } = useContext(GridProviderContext);

    const child = `${path}[${index}]`;

    const next = jsonpath.value(layout, child);
    const isValid = typeof next == "string";

    const panelRef = useRef<ImperativePanelHandle>(null);

    const [collapsed, setCollapsed] = useState(false);

    const getComponent = (id) => {
        return list[widgets.map(({ id }) => id).indexOf(id)];
    };

    if (isValid) {
        return (
            <GridResizePanel innerRef={panelRef}>
                <Widget panelRef={panelRef} collapsed={collapsed}>
                    {getComponent(next)}
                </Widget>
            </GridResizePanel>
        );
    }

    function render(path, isRow) {
        const newPath = [path, isRow ? "row" : "column"].join('.');

        const array = path.split('.');
        const isRoot = array.length === 1;

        if (isRoot) {
            return (
                <PathContext.Provider value={{ path: newPath }}>
                    <PanelGroup direction={isRow ? "vertical" : "horizontal"}>
                        <GridRender />
                    </PanelGroup>
                </PathContext.Provider>
            );
        }

        return (
            <PathContext.Provider value={{ path: newPath }}>
                <GridResizePanel>
                    <PanelGroup direction={isRow ? "vertical" : "horizontal"}>
                        <GridRender />
                    </PanelGroup>
                </GridResizePanel>
            </PathContext.Provider>
        );
    }

    return render(child, next.row);
}
