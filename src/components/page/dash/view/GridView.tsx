import {createContext, useState} from "react";
import GridProvider from "../GridProvider";
export const LayoutContext = createContext(null);
export const WidgetsContext = createContext(null);

export default function GridView({ defaultLayout, widgets }) {
    const [layout, setLayout] = useState(defaultLayout);

    return (
        <WidgetsContext.Provider value={{ widgets }}>
            <LayoutContext.Provider value={{ layout, setLayout }}>
                <GridProvider list={widgets}>
                    <ResizeGroup direction="horizontal">
                        <ResizePanel>
                            <GridRender />
                        </ResizePanel>
                        <ResizeHandle />
                        <ResizePanel defaultSize={5} minSize={5} maxSize={5} collapsible>
                            <GridWidgetListView />
                        </ResizePanel>
                    </ResizeGroup>
                </GridProvider>
            </LayoutContext.Provider>
        </WidgetsContext.Provider>
    )
}
