import React from "react";

export default function FullLayout({ head, side, header, children }) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex bg-gray-700">
                <div className="flex w-64 shrink-0 p-5 items-center">
                    {head}
                </div>
                <div className="w-full p-5">
                    {header}
                </div>
            </div>
            <div className="flex overflow-y-hidden">
                <aside className="w-64 p-5">
                    {side}
                </aside>
                <main className="grow">
                    {children}
                </main>
            </div>
        </div>
    )
}
