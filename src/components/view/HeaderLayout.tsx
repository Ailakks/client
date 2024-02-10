import React from "react";

export default function HeaderLayout({ header, children }) {
    return (
        <div className="flex flex-col">
            <header className="flex items-center bg-gray-700 h-14 px-8">
                {header}
            </header>
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}
