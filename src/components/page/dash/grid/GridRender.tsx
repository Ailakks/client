import {createContext, useContext, useRef} from "react";
import {LayoutContext} from "./GridView";
import List, {ListContext} from "../../../list/List";
import GridResizePanel from "../resize/ResizePanel";
import {ImperativePanelHandle, PanelGroup} from "react-resizable-panels";
import {GridProviderContext} from "../GridProvider";
import Widget from "../item/Widget";

export const PathContext = createContext(null);
export const GridPanelConext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);

    return (
        <List list={layout}>
            <Child />
        </List>
    )
}

function Child() {
    const { item: { column, row } } = useContext(ListContext);

    const ref = useRef<ImperativePanelHandle>(null);

    return (
        <GridPanelConext.Provider value={{ ref }}>
            <GridResizePanel>
                <PanelGroup direction={column ? "vertical" : "horizontal"}>
                    <List list={column ?? row}>
                        <Body />
                    </List>
                </PanelGroup>
            </GridResizePanel>
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
        <Widget>
            {getComponent(content)}
        </Widget>
    );
}