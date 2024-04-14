import {Fragment, useContext} from "react";
import {Panel} from "react-resizable-panels";
import {ListContext} from "../../../list/List";
import ResizeHandle from "./ResizeHandle";
import {GridPanelConext} from "../grid/GridRender";

export default function GridResizePanel({ children }) {
    const { ref } = useContext(GridPanelConext);

    const { list, index } = useContext(ListContext);

    return (
        <Fragment>
            <Panel id={index} order={index} ref={ref} minSize={15} collapsedSize={8} collapsible>
                {children}
            </Panel>
            {list.length !== index + 1 && <ResizeHandle />}
        </Fragment>
    )
}
