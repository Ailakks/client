import {createContext, useEffect, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup} from "react-resizable-panels";
import GridRender from "./GridRender";
import WidgetList from "../view/WidgetList";
import ResizeHandle from "../resize/ResizeHandle";

export const LayoutContext = createContext(null);

export default function GridView({ defaultLayout, widgets }) {
    const [layout, setLayout] = useState(defaultLayout);

    useEffect(() => {

    }, [layout]);

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            <GridProvider list={widgets}>
                <PanelGroup direction="horizontal">
                    <Panel>
                        <GridRender />
                    </Panel>
                    <ResizeHandle />
                    <Panel defaultSize={3.5} minSize={3.5} maxSize={3.5} collapsible>
                        <WidgetList />
                    </Panel>
                </PanelGroup>
            </GridProvider>
        </LayoutContext.Provider>
    )
}
