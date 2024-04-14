import {Panel, PanelGroup} from "react-resizable-panels";
import ResizeHandle from "../../page/dash/resize/ResizeHandle";
import AppSide from "../app/Side";
import AppHeader from "../app/Header";

export default function DashLayout({ children }) {
    return (
        <PanelGroup direction="vertical">
            <Panel defaultSize={8} minSize={8} maxSize={8} collapsible>
                <AppHeader />
            </Panel>
            <ResizeHandle />
            <Panel>
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={12} minSize={12} maxSize={12} collapsible>
                        <AppSide />
                    </Panel>
                    <ResizeHandle />
                    <Panel>
                        {children}
                    </Panel>
                </PanelGroup>
            </Panel>
        </PanelGroup>
    )
}
