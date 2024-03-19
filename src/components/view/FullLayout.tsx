import React from "react";

export default function FullLayout({ head, side, header, children }) {
    return (
        <div className="flex h-full">
            <aside className="w-64 divide-y divide-gray-500">
                <header className="grid items-center bg-gray-700 px-8 h-20">
                    {head}
                </header>
                <div className="grow border-r border-gray-300 p-3">
                    {side}
                </div>
            </aside>
            <div className="grow flex flex-col h-full">
                <header className="flex items-center bg-gray-700 pr-8 h-20">
                    {header}
                </header>
                <main className="grow overflow-y-auto basis-0">
                    {children}
                </main>
            </div>
        </div>
    )
}
