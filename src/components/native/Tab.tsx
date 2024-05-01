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
            <div className="w-full">
                <button className="tab" onClick={update}>
                    {children}
                </button>
                {content === current &&  <hr className="h-1 w-full bg-orange-500" />}
            </div>
        </TabContext.Provider>
    )
}
