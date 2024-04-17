import {createContext, useEffect, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup} from "react-resizable-panels";
import GridRender from "./GridRender";
import WidgetList from "../view/WidgetList";
import ResizeHandle from "../resize/ResizeHandle";

export const LayoutContext = createContext(null);

export default function GridView({ defaultLayout, widgets }) {
    const [layout, setLayout] = useState(defaultLayout);
    const [list, setList] = useState([]);

    const serialize = (list) => list.reduce((acc, item) => {
        if (Array.isArray(item.row)) {
            acc = acc.concat(serialize(item.row));
        } else if (Array.isArray(item.column)) {
            acc = acc.concat(serialize(item.column));
        } else if (typeof item === 'string') {
            acc.push(item);
        }
        return acc;
    }, []);

    useEffect(() => {
        setList(serialize(layout));
    }, [layout]);

    return (
        <LayoutContext.Provider value={{ list, layout, setLayout }}>
            <GridProvider list={widgets}>
                <PanelGroup direction="horizontal">
                    <Panel>
                        <GridRender />
                    </Panel>
                    <ResizeHandle />
                    <Panel defaultSize={4.5} minSize={4.5} maxSize={4.5} collapsible>
                        <WidgetList />
                    </Panel>
                </PanelGroup>
            </GridProvider>
        </LayoutContext.Provider>
    )
}
