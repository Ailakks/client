import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [index, setIndex] = useState(0);

    return (
        <TabsContext.Provider value={{ index, setIndex }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-start items-center">
                <div className="flex bg-gray-700 space-x-2 p-2 rounded-full">
                    {children}
                </div>
            </div>
        </TabsContext.Provider>
    )
}
