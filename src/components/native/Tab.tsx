import React, {createContext, useContext, useState} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [header, setHeader] = useState();
    const [content, setContent] = useState();

    const { current, setCurrent } = useContext(TabsContext);

    const update = () => {
        setCurrent(content);
    };

    return (
        <TabContext.Provider value={{ header, setHeader, content, setContent }}>
            <button className={clsx("tab", content === current && "border-orange-500")} onClick={update}>
                {children}
            </button>
        </TabContext.Provider>
    )
}
