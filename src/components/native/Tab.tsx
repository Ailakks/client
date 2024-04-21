import React, {createContext, useContext, useEffect, useState} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";

export const TabContext = createContext();

export default function Tab({ content, children }) {
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
            <div>
                <button className={clsx("tab", index === current && "bg-orange-500")} onClick={set}>
                    {content}
                </button>
                {children}
            </div>
        </TabContext.Provider>
    )
}
