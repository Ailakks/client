import {Fragment, useContext} from "react";
import {Panel, PanelResizeHandle} from "react-resizable-panels";
import {ListContext} from "../../../list/List";

export default function GridResizePanel({ innerRef, children }) {
    const { list, index } = useContext(ListContext);

    return (
        <Fragment>
            <Panel id={index} order={index} ref={innerRef} minSize={15} collapsible collapsedSize={8}>
                {children}
            </Panel>
            {list.length !== index + 1 && <PanelResizeHandle className="bg-orange-500 w-2" />}
        </Fragment>
    )
}
