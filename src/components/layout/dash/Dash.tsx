import {Panel, PanelGroup} from "react-resizable-panels";
import ResizeHandle from "../../page/dash/resize/ResizeHandle";
import AppSide from "../app/Side";
import AppHeader from "../app/Header";
import {createContext, useState} from "react";

export const HeaderContext = createContext();

export default function DashLayout({ children }) {
    const [header, setHeader] = useState(null);

    return (
        <HeaderContext.Provider value={{ header, setHeader }}>
            <PanelGroup direction="vertical">
                <Panel defaultSize={8} minSize={8} maxSize={8} collapsible>
                    <AppHeader />
                </Panel>
                <ResizeHandle />
                <Panel>
                    <PanelGroup direction="horizontal">
                        <Panel defaultSize={15} minSize={15} maxSize={15} collapsible>
                            <AppSide />
                        </Panel>
                        <ResizeHandle />
                        <Panel>
                            {children}
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </HeaderContext.Provider>
    )
}
