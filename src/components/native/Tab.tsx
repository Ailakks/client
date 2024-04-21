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

    return (
        <TabContext.Provider value={{ index, current }}>
            <button className={clsx("tab", content === current && "bg-gray-300")} onClick={update}>
                {children}
            </button>
        </TabContext.Provider>
    )
}
