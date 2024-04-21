import React, {createContext, useContext, useEffect, useState} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [current, setCurrent] = useState();

    const { index, setIndex } = useContext(TabsContext);

    useEffect(() => {
        setIndex((previous) => previous++);
    }, []);

    useEffect(() => {
       setCurrent(index);
    }, [index]);

    const set = () => {
        setIndex(current);
    }

    return (
        <TabContext.Provider value={{ index, current }}>
            <button className={clsx("tab", index === current && "bg-gray-300")} onClick={set}>
                {children}
            </button>
        </TabContext.Provider>
    )
}
