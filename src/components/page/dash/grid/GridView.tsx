import {createContext, useEffect, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup} from "react-resizable-panels";
import GridRender from "./GridRender";
import WidgetList from "../view/WidgetList";
import ResizeHandle from "../resize/ResizeHandle";
import LayoutSelector from "../view/LayoutSelector";

export const LayoutContext = createContext(null);

export default function GridView({ widgets }) {
    const [serialize, setSerialize] = useState(null);
    const [list, setList] = useState([]);

    const parse = (list) => list.reduce((acc, item) => {
        if (Array.isArray(item.row)) {
            acc = acc.concat(parse(item.row));
        } else if (Array.isArray(item.column)) {
            acc = acc.concat(parse(item.column));
        } else if (Array.isArray(item.child)) {
            acc = acc.concat(parse(item.child));
        } else if (item.content) {
            acc.push(item.content);
        }
        return acc;
    }, []);

    useEffect(() => {
        if (!serialize) {
            return;
        }

        setList(parse(serialize));
    }, [serialize]);

    if (!serialize) {
        return (
            <LayoutContext.Provider value={{ serialize, setLayout: setSerialize }}>
                <LayoutSelector />
            </LayoutContext.Provider>
        )
    }

    return (
        <LayoutContext.Provider value={{ list, serialize, setLayout: setSerialize }}>
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
