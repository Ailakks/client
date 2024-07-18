import {createContext, useState} from "react";

export const LayoutContext = createContext();

export default function Layout({ head, header, side, footer, children }) {
    const [side, setSide] = useState();

    return (
        <LayoutContext.Provider value={{ side, setSide }}>
            <div className="h-full flex flex-col mx-auto max-w-screen-2xl px-5">
                <div className="flex h-20 shrink-0">
                    <div className="flex w-64 shrink-0 items-center">
                        {head}
                    </div>
                    <div className="w-full">
                        {header}
                    </div>
                </div>
                <div className="grow flex overflow-x-hidden overflow-y-auto">
                    {side && <aside className="w-64 p-5">
                        {side}
                    </aside>}
                    <main className="grow">
                        {children}
                    </main>
                </div>
                <div>
                    {footer}
                </div>
            </div>
        </LayoutContext.Provider>
    )
}
