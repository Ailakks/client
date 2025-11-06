export default function Layout({ head, header, side, footer, children }) {
    return (
        <div className="h-full flex flex-col mx-auto max-w-screen-2xl p-5">
            <div className="flex h-20 shrink-0">
                <div className="flex w-64 shrink-0 items-center">
                    {head}
                </div>
                <div className="w-full">
                    {header}
                </div>
            </div>
            <div className="grow flex overflow-x-hidden overflow-y-auto">
                {side && <aside className="w-64">
                    {side}
                </aside>}
                <main className="grow">
                    {children}
                </main>
            </div>
            <div>
                {footer}
            </div>
        </div>
    )
}
