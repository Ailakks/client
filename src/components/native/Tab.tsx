import React, {createContext, useContext} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";
import TabContent from "./TabContent";

export const TabContext = createContext();

export default function Tab({ id, tab, children }) {
    const { index, setIndex } = useContext(TabsContext);

    const set = () => {
        setIndex(id);
    }

    return (
        <TabContext.Provider value={{id}}>
            <button className={clsx("tab", id === index && "bg-orange-500")} onClick={set}>
                {tab}
            </button>
            <TabContent>
                {children}
            </TabContent>
        </TabContext.Provider>
    )
}
