import {useContext} from "react";
import {GridProviderContext} from "../GridProvider";
import List, {ListContext} from "../../../list/List";
import Draggable from "../../../drop/Draggable";
import {LayoutContext} from "../grid/GridView";

export default function WidgetList() {
    const { widgets } = useContext(GridProviderContext);

    return (
        <div className="flex flex-col justify-between h-full bg-gray-500 p-2">
            <div className="space-y-2">
                <List list={widgets}>
                    <Item/>
                </List>
            </div>
            <button className="menu">
                <i className="fa-regular fa-store" />
            </button>
        </div>
    )
}

function Item() {
    const { item } = useContext(ListContext);
    const { list } = useContext(LayoutContext);

    const { id, name, icon } = item;

    if (list.includes(id)) {
        return (
            <button className="menu disabled">
                <i className={icon}/>
            </button>
        )
    }

    return (
        <Draggable data={item}>
            <button className="menu">
            <i className={icon}/>
            </button>
        </Draggable>
    )
}
