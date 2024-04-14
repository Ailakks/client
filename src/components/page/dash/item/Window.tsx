import {useContext} from "react";
import {WidgetDataContext} from "./Widget";
import ContextMenu from "../../../context/ContextMenu";
import {GridProviderContext} from "../GridProvider";
import {ListContext} from "../../../list/List";

export default function Window({ children }) {
    const { metadata, collapsed, replace, remove, collapse } = useContext(WidgetDataContext);

    const { name } = metadata;

    return (
        <div className="h-full bg-gray-700 min-w-60 overflow-x-auto">
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
    const { widgetList } = useContext(GridProviderContext);

    return (
        <button>
            <ContextMenu list={widgetList} content={<Item />}>
                <i className="fa-regular fa-plus" />
            </ContextMenu>
        </button>
    )
}

function Item() {
    const { item: { id, icon, name } } = useContext(ListContext);

    const { add } = useContext(WidgetDataContext);

    return (
        <button className="w-full inline py-2 px-5 hover:bg-gray-300" onClick={() => add(id)}>
            <i className={icon} />
            <p>{name}</p>
        </button>
    )
}
