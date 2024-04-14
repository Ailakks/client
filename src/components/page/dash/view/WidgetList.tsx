import {useContext} from "react";
import {GridProviderContext} from "../GridProvider";
import List, {ListContext} from "../../../list/List";
import Draggable from "../../../drop/Draggable";
import {LayoutContext} from "../grid/GridView";


export default function WidgetList() {
    const { widgetList } = useContext(GridProviderContext);

    return (
        <div className="flex flex-col justify-between h-full bg-gray-500 p-2">
            <div className="space-y-2">
                <List list={widgetList}>
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
    const { layout } = useContext(LayoutContext);

    const serialize = (data) => {
        const list = [];

        function traverse(object) {
            if (Array.isArray(object)) {
                object.forEach(item => traverse(item));
            } else if (typeof object === 'object') {
                if (object.row) traverse(object.row);
                if (object.column) traverse(object.column);
            } else if (typeof object === 'string') {
                list.push(object);
            }
        }

        traverse(data);

        return list;
    }

    const { name, icon } = item;

    return (
        <Draggable data={item}>
            <button className="menu">
                <i className={icon}/>
            </button>
        </Draggable>
    )
}
