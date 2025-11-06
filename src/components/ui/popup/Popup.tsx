export default function Popup({ children }) {
    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 z-20 bg-black bg-opacity-90 backdrop-blur-sm p-5">
            {children}
        </div>
    )
}
