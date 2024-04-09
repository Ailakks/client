import {createContext, useEffect, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup} from "react-resizable-panels";
import GridRender from "./GridRender";
import WidgetList from "../view/WidgetList";
import ResizeHandle from "../resize/ResizeHandle";

export const LayoutContext = createContext(null);
export const WidgetsContext = createContext(null);

export default function GridView({ defaultLayout, widgets }) {
    const [layout, setLayout] = useState(defaultLayout);

    useEffect(() => {
        console.log(layout);
    }, [layout]);

    return (
        <WidgetsContext.Provider value={{ widgets }}>
            <LayoutContext.Provider value={{ layout, setLayout }}>
                <GridProvider list={widgets}>
                    <PanelGroup direction="horizontal">
                        <Panel>
                            <GridRender />
                        </Panel>
                        <ResizeHandle />
                        <Panel defaultSize={5} minSize={5} maxSize={5} collapsible>
                            <WidgetList />
                        </Panel>
                    </PanelGroup>
                </GridProvider>
            </LayoutContext.Provider>
        </WidgetsContext.Provider>
    )
}
