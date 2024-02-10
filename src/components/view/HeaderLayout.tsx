import React from "react";

export default function HeaderLayout({ header, children }) {
    return (
        <div className="flex flex-col h-full bg-gray-700">
            <header className="flex items-center h-14 px-8">
                {header}
            </header>
            <div className="grow p-6">
                {children}
            </div>
        </div>
    )
}
