export default function Layout({ head, side, header, children }) {
    return (
        <div className="flex divide-gray-500">
            <div className="flex w-64">
                {head}
                {side}
            </div>
            <div className="flex flex-col">
                {header}
                {children}
            </div>
        </div>
    )
}
