import React from "react";

export default function Layout({ head, side, header, children }) {
    return (
        <div className="flex divide-x divide-gray-300">
            <aside className="w-64 divide-y divide-gray-300">
                <header className="flex items-center justify-center bg-gray-500 h-14 p-3">
                    {head}
                </header>
                <div className="p-3">
                    {side}
                </div>
            </aside>
            <div className="grow divide-y divide-gray-300">
                <header className="flex items-center bg-gray-500 h-14 p-3">
                    {header}
                </header>
                <main className="p-3">
                    {children}
                </main>
            </div>
        </div>
    )
}
