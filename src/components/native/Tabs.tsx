import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ def, children }) {
    const [current, setCurrent] = useState(def);

    return (
        <TabsContext.Provider value={{ current, setCurrent }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-start items-center">
                <div className="flex space-x-4">
                    {children}
                </div>
                {current}
            </div>
        </TabsContext.Provider>
    )
}
