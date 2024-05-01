import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [fallback, setFallback] = useState(null);
    const [current, setCurrent] = useState(null);

    return (
        <TabsContext.Provider value={{ fallback, setFallback, current, setCurrent }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-stretch">
                <div className="flex p-2 rounded-full justify-between">
                    {children}
                </div>
                {current ?? fallback}
            </div>
        </TabsContext.Provider>
    )
}
