import React from "react";

export default function FullLayout({ head, side, header, children }) {
    return (
        <div className="flex h-full">
            <aside className="flex flex-col w-64 divide-y divide-gray-500">
                <header className="flex items-center bg-gray-700 h-14 px-8">
                    {head}
                </header>
                <div className="grow border-r border-gray-300 p-3">
                    {side}
                </div>
            </aside>
            <div className="h-full flex flex-col grow divide-y divide-gray-500">
                <header className="flex items-center bg-gray-700 h-14 pr-8">
                    {header}
                </header>
                <main className="grow">
                    {children}
                </main>
            </div>
        </div>
    )
}
