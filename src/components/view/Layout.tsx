import React from "react";

export default function Layout({ head, side, header, children }) {
    return (
        <div className="flex divide-gray-500">
            <aside className="w-64 divide-gray-500">
                <header className="h-14">
                    {head}
                </header>
                {side}
            </aside>
            <div className="grow divide-gray-500">
                <header className="h-14">
                    {header}
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
