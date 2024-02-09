export default function Layout({ head, side, header, children }) {
    return (
        <>
            <div className="flex">
                {head}
                {header}
            </div>
        </>
    )
}
