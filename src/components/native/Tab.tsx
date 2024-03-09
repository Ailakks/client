import React, {createContext, useContext, useEffect, useState} from "react";
import {TabsContext} from "./Tabs";

export const TabContext = createContext();

export default function Tab({ children }) {
    const [current, setCurrent] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        if (!current) {
            setCurrent(content);
        }
    }, []);

    const update = () => {
        setCurrent(content);
    };

    return (
        <TabContext.Provider value={{ content, setContent }}>
            <button onClick={update}>
                {children}
            </button>
            {current}
        </TabContext.Provider>
    )
}
