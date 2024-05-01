import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [fallback, setFallback] = useState(null);
    const [current, setCurrent] = useState(null);

    return (
        <TabsContext.Provider value={{ fallback, setFallback, current, setCurrent }}>
            <div className="flex flex-col grow">
                <div className="flex p-2 rounded-full justify-between">
                    {children}
                </div>
                {current ?? fallback}
            </div>
        </TabsContext.Provider>
    )
}
