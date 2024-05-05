import {createContext, useEffect, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup} from "react-resizable-panels";
import GridRender from "./GridRender";
import WidgetList from "../view/WidgetList";
import ResizeHandle from "../resize/ResizeHandle";
import LayoutSelector from "../view/LayoutSelector";

export const LayoutContext = createContext(null);

export default function GridView({ widgets }) {
    const [layout, setLayout] = useState(null);
    const [list, setList] = useState([]);

    const serialize = (list) => list.reduce((acc, item) => {
        if (Array.isArray(item.row)) {
            acc = acc.concat(serialize(item.row));
        } else if (Array.isArray(item.column)) {
            acc = acc.concat(serialize(item.column));
        } else if (Array.isArray(item.child)) {
            acc = acc.concat(serialize(item.child));
        } else if (item.content) {
            acc.push(item.content);
        }
        return acc;
    }, []);

    useEffect(() => {
        if (!layout) {
            return;
        }

        setList(serialize(JSON.parse(layout.serialize)));
    }, [layout]);

    if (!layout) {
        return (
            <LayoutContext.Provider value={{ layout, setLayout }}>
                <LayoutSelector />
            </LayoutContext.Provider>
        )
    }

    return (
        <LayoutContext.Provider value={{ list, layout, setLayout }}>
            <LayoutSelector />
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
