import React, {createContext, useContext, useState} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [content, setContent] = useState();
    const [header, setHeader] = useState();

    const { current, setCurrent } = useContext(TabsContext);

    const update = () => {
        setCurrent(content);
    };

    return (
        <TabContext.Provider value={{ header, setHeader, content, setContent }}>
            <button className={clsx("tab", content === current && "bg-gray-300")} onClick={update}>
                {header}
            </button>
            {children}
        </TabContext.Provider>
    )
}
