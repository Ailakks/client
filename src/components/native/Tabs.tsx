import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ def, children }) {
    const [current, setCurrent] = useState(def);

    return (
        <TabsContext.Provider value={{ current, setCurrent }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-start items-center">
                <div className="flex bg-gray-700 space-x-2 py-2 px-4 rounded-md">
                    {children}
                </div>
                {current}
            </div>
        </TabsContext.Provider>
    )
}
