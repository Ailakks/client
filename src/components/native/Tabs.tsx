import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [current, setCurrent] = useState();

    return (
        <TabsContext.Provider value={{ current, setCurrent }}>
            {children}
            {current}
        </TabsContext.Provider>
    )
}
