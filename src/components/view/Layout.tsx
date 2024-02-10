import React from "react";

export default function Layout({ head, side, header, children }) {
    return (
        <div className="flex h-full">
            <aside className="flex flex-col w-64 divide-y divide-gray-300">
                <header className="flex items-center bg-gray-500 h-14 p-3">
                    {head}
                </header>
                <div className="grow border-r border-gray-300 p-3">
                    {side}
                </div>
            </aside>
            <div className="h-full grow divide-y divide-gray-300">
                <header className="flex items-center bg-gray-500 h-14 pr-3">
                    {header}
                </header>
                <main className="p-3">
                    {children}
                </main>
            </div>
        </div>
    )
}
