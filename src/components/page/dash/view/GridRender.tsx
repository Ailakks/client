import {createContext, isValidElement, useContext, useRef, useState} from "react";
import {ImperativePanelHandle, Panel, PanelGroup} from "react-resizable-panels";
import jsonpath from "jsonpath";
import {LayoutContext} from "./GridView";
import List, {ListContext} from "../../../list/List";
import Widget from "../item/Widget";

export const PathContext = createContext(null);
export const GridViewContext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };

    const next = jsonpath.value(layout, path);

    return (
        <List list={next}><Item /></List>
    )
}

function Item() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };
    const { index } = useContext(ListContext);

    const child = `${path}[${index}]`;

    const next = jsonpath.value(layout, child);
    const isValid = isValidElement(next);

    const panelRef = useRef<ImperativePanelHandle>(null);

    const [collapsed, setCollapsed] = useState(false);

    if (isValid) {
        return (
            <Panel innerRef={panelRef} onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}>
                <Widget panelRef={panelRef} collapsed={collapsed}>
                    {next}
                </Widget>
            </Panel>
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
