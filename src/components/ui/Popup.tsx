export default function Popup() {
    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-500">
            {children}
        </div>
    )
}
