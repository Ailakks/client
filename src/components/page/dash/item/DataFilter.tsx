import {createContext, useContext, useState} from "react";
import List, {ListContext} from "../../../list/List";
import {clsx} from "clsx";

export const FilterContext = createContext(null);

export default function DataFilter({ list, data, children }) {
    const [filter, setFilter] = useState([]);

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            <div>
                <div className="space-y-2">
                    <List list={list}>
                        <Section />
                    </List>
                </div>
                {children}
            </div>
        </FilterContext.Provider>
    )
}

function Section() {
    const { item: { list } } = useContext(ListContext);

    return (
        <List list={list}>
            <Item />
        </List>
    )
}

function Item() {
    const { item } = useContext(ListContext);
    const { filter, setFilter } = useContext(FilterContext);

    const { id, displayName } = item;

    const add = () => {
        setFilter((previous) => [...previous, item]);
    };

    const remove = () => {
        setFilter((previous) => previous.filter(({ id: target }) => target !== id));
    };

    const isEnabled = filter.find(({ id: target }) => target === id);

    return (
         <div className={clsx(isEnabled && "bg-white", "bg-gray-300")} onClick={isEnabled ? remove : add}>{displayName}</div>
    )
}
