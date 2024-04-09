import {useContext} from "react";
import {WidgetContext} from "./Widget";
import ContextMenu from "../../../context/ContextMenu";
import {GridProviderContext} from "../GridProvider";
import {ListContext} from "../../../list/List";

export default function Window({ children }) {
    const { metadata, collapsed, replace, remove, collapse } = useContext(WidgetContext);

    const { name } = metadata;

    return (
        <div className="h-full bg-gray-700">
            <div className="flex justify-between items-center h-10 bg-gray-300 p-5">
                <p>{name}</p>
                <div className="space-x-5">
                    <button onClick={replace}>
                        <i className="fa-regular ellipsis" />
                    </button>
                    <AddButton />
                    <button onClick={collapse}>
                        <i className={collapsed ? "fa-regular fa-angle-down" : "fa-regular fa-angle-up"} />
                    </button>
                    <button onClick={remove}>
                        <i className="fa-regular fa-xmark" />
                    </button>
                </div>
            </div>
            {!collapsed && children}
        </div>
    )
}

function AddButton() {
    const { add } = useContext(WidgetContext);

    const { widgetList } = useContext(GridProviderContext);

    return (
        <ContextMenu list={widgetList} content={<Item />}>
            <i className="fa-regular fa-plus" />
        </ContextMenu>
    )
}

function Item() {
    const { item: { icon, name } } = useContext(ListContext);

    return (
        <p>{name}</p>
    )
}
