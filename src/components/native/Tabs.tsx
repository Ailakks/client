import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    const [def, setDef] = useState(null);
    const [current, setCurrent] = useState(null);

    return (
        <TabsContext.Provider value={{ current, setCurrent, def, setDef }}>
            <div className="h-full w-full flex flex-col space-y-6 justify-start items-center">
                <div className="flex bg-gray-700 space-x-2 p-2 rounded-full">
                    {children}
                </div>
                {current ?? def}
            </div>
        </TabsContext.Provider>
    )
}
