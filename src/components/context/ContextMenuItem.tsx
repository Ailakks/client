import {useContext} from "react";
import {ListContext} from "../list/List";
import {clsx} from "clsx";

export default function ContextMenuItem() {
    const { item } = useContext(ListContext);
    const { id, icon, action } = item;

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(item)}>
            <i className={clsx('w-6', icon)} />
            <p>{id}</p>
        </div>
    )
}
