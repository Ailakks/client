import List, {ListContext} from "../list/List";
import {createContext, Fragment, useContext, useState} from "react";

export const TabsContext = createContext();

export default function TabList({ list }) {
    const [current, setCurrent] = useState(0);

    return (
        <TabsContext.Provider value={{ current, setCurrent }}>
            <List list={list}>
                <Item />
            </List>
        </TabsContext.Provider>
    )
}

function Item() {
    const { index, item: { name, child } } = useContext(ListContext);

    const { current, setCurrent } = useContext(TabsContext);

    const set = () => {
        setCurrent(index);
    };

    return (
        <div>
            <div className="flex">
                <button onClick={set}>
                    {name}
                </button>
            </div>
            {current === index && child}
        </div>
    )
}
