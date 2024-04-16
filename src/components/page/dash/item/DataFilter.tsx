import {createContext, useContext, useEffect, useState} from "react";
import List, {ListContext} from "../../../list/List";
import {clsx} from "clsx";

export const DataFilterContext = createContext(null);
export const FilterContext = createContext(null);

export default function DataFilter({ list, property, data, children }) {
    const [filter, setFilter] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        setFiltered(data.filter((item) => {
            if (filter.length < 1) {
                return true;
            }

            const value = property(item);

            return filter.map(({ id }) => id).includes(value);
        }));
    }, [data, filter]);

    return (
        <FilterContext.Provider value={{ list, filter, setFilter }}>
            <div className="flex flex-col grow space-y-2">
                <List list={list}>
                    <Section />
                </List>
                <DataFilterContext.Provider value={{ filtered }}>
                    <div className="overflow-y-auto">
                        {children}
                    </div>
                </DataFilterContext.Provider>
            </div>
        </FilterContext.Provider>
    )
}

function Section() {
    const { item: { list } } = useContext(ListContext);
    const { filter, setFilter } = useContext(FilterContext);

    const clear = () => {
        setFilter([]);
    };

    return (
        <div className="flex h-6 space-x-2">
            {filter.length > 0 && (
                <button className="h-full bg-gray-300 rounded-full aspect-square" onClick={clear}>
                    <i className="fa-regular fa-xmark" />
                </button>
            )}
            <List list={list}>
                <Item />
            </List>
        </div>
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
         <div className={clsx(isEnabled && "bg-white text-black", "bg-gray-300 text-white px-3 rounded-full cursor-pointer")} onClick={isEnabled ? remove : add}>{displayName}</div>
    )
}
