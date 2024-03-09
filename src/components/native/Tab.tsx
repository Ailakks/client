import React, {createContext, useContext, useState} from "react";
import {TabsContext} from "./Tabs";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [content, setContent] = useState();

    const { current, setCurrent } = useContext(TabsContext);

    const update = () => {
        setCurrent(content);
    };

    return (
        <TabContext.Provider value={{ content, setContent }}>
            <button onClick={update}>
                {children}
            </button>
        </TabContext.Provider>
    )
}
