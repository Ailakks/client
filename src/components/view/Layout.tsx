import React from "react";

export default function Layout({ head, side, header, children }) {
    return (
        <div className="flex divide-x divide-gray-300">
            <aside className="w-64 divide-y divide-gray-300">
                <header className="bg-gray-500 h-14 p-3">
                    {head}
                </header>
                {side}
            </aside>
            <div className="grow divide-y divide-gray-300">
                <header className="bg-gray-500 h-14">
                    {header}
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
