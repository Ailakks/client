import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [fallback, setFallback] = useState(null);
    const [current, setCurrent] = useState(null);

    return (
        <TabsContext.Provider value={{ fallback, setFallback, current, setCurrent }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-start items-center">
                <div className="flex bg-gray-700 space-x-2 p-2 rounded-full">
                    {children}
                </div>
                {current ?? fallback}
            </div>
        </TabsContext.Provider>
    )
}
