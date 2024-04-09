import {createContext, useState} from "react";
import GridProvider from "../GridProvider";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import GridRender from "./GridRender";

export const LayoutContext = createContext(null);
export const WidgetsContext = createContext(null);

export default function GridView({ defaultLayout, widgets }) {
    const [layout, setLayout] = useState(defaultLayout);

    return (
        <WidgetsContext.Provider value={{ widgets }}>
            <LayoutContext.Provider value={{ layout, setLayout }}>
                <GridProvider list={widgets}>
                    <PanelGroup direction="horizontal">
                        <Panel>
                            <GridRender />
                        </Panel>
                        <PanelResizeHandle />
                        <Panel defaultSize={5} minSize={5} maxSize={5} collapsible>
                            <p>test</p>
                        </Panel>
                    </PanelGroup>
                </GridProvider>
            </LayoutContext.Provider>
        </WidgetsContext.Provider>
    )
}
