import React from "react";
import ErrorBoundaryWrapper from "../native/ErrorBoundaryWrapper";

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
            <div className="grow flex overflow-y-hidden">
                {side && <aside className="w-64 p-5">
                    {side}
                </aside>}
                <main className="grow">
                    <ErrorBoundaryWrapper>
                        {children}
                    </ErrorBoundaryWrapper>
                </main>
            </div>
        </div>
    )
}
