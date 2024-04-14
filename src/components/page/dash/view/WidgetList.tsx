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
        return data.reduce((acc, item) => {
            if (Array.isArray(item.row)) {
                acc = acc.concat(serialize(item.row));
            } else if (Array.isArray(item.column)) {
                acc = acc.concat(serialize(item.column));
            } else if (typeof item === 'string') {
                acc.push(item);
            }
            return acc;
        }, []);
    };

    const serialized = serialize(layout);

    const { id, name, icon } = item;

    if (serialized.includes(id)) {
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
