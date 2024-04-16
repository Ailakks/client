import {createContext, useContext, useEffect, useState} from "react";
import List, {ListContext} from "../../../list/List";
import {clsx} from "clsx";

export const FilterContext = createContext(null);

export default function DataFilter({ data }) {
    return (
        <div className="space-y-2">
            <List data={data} component={<Section />} />
        </div>
    )
}

function Section() {
    const { item: { list } } = useContext(ListContext);

    return (
        <List data={list} component={<Item />} />
    )
}

function Item() {
    const { item: { name } } = useContext(ListContext);
    const { filter, setFilter } = useContext(FilterContext);

    const add = () => {
        setFilter((previous) => [...previous, item]);
    };

    const remove = () => {
        setFilter((previous) => previous.filter(({ id }) => id !== item.id));
    };

    const isEnabled = filter.find(({ id }) => id === item.id);

    return (
         <div className={clsx(isEnabled && "bg-white", "bg-gray-300")} onClick={isEnabled ? add : remove}>{name}</div>
    )
}
