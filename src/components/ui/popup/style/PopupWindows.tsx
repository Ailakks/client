export default function PopupWindows({ children }) {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="max-w-[500px] max-h-[700px] min-w-[400px] p-5 bg-gray-500 rounded-xl">
                {children}
            </div>
        </div>
    )
}
