import React, {createContext, useContext, useState} from "react";
import {TabsContext} from "./Tabs";
import {clsx} from "clsx";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [content, setContent] = useState();

    const { current, setCurrent } = useContext(TabsContext);

    const update = () => {
        setCurrent(content);
    };

    return (
        <TabContext.Provider value={{ content, setContent }}>
            <button className={clsx("px-4 py-2 rounded-md", content == current && "bg-gray-500")} onClick={update}>
                {children}
            </button>
        </TabContext.Provider>
    )
}
