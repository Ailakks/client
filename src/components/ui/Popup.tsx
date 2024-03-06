export default function Popup({ children }) {
    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-500 p-5">
            {children}
        </div>
    )
}
