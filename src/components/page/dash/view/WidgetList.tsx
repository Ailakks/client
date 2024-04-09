import {useContext} from "react";
import {GridProviderContext} from "../GridProvider";
import List, {ListContext} from "../../../list/List";


export default function WidgetList() {
    const { widgetList } = useContext(GridProviderContext);

    return (
        <div className="space-y-2">
            <List list={widgetList}><Item /></List>
        </div>
    )
}

function Item() {
    const { item: { name, icon } } = useContext(ListContext);

    return (
        <div>
            <i className={icon} />
        </div>
    )
}
