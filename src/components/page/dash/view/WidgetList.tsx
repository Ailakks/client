import {useContext} from "react";
import {GridProviderContext} from "../GridProvider";
import List, {ListContext} from "../../../list/List";


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
    const { item: { name, icon } } = useContext(ListContext);

    return (
        <button className="menu">
            <i className={icon} />
        </button>
    )
}
