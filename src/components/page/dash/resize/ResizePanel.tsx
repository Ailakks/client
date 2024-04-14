import {Fragment, useContext} from "react";
import {Panel} from "react-resizable-panels";
import {ListContext} from "../../../list/List";
import ResizeHandle from "./ResizeHandle";

export default function GridResizePanel({ innerRef, children }) {
    const { list, index } = useContext(ListContext);

    return (
        <Fragment>
            <Panel id={index} order={index} ref={innerRef} minSize={15} collapsedSize={8} collapsible>
                {children}
            </Panel>
            {list.length !== index + 1 && <ResizeHandle />}
        </Fragment>
    )
}
