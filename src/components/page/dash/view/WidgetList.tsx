import {useContext} from "react";
import {GridProviderContext} from "../GridProvider";
import List, {ListContext} from "../../../list/List";


export default function WidgetList() {
    const { widgetList } = useContext(GridProviderContext);

    return (
        <div className="h-full bg-gray-500 space-y-2 p-2">
            <List list={widgetList}><Item /></List>
        </div>
    )
}

function Item() {
    const { item: { name, icon } } = useContext(ListContext);

    return (
        <div className="flex justify-center items-center w-full aspect-square bg-gray-700 rounded cursor-pointer">
            <i className={icon} />
        </div>
    )
}
