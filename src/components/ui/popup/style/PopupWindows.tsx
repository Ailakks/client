export default function PopupWindows({ children }) {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-[500px] h-[700px] p-5 bg-gray-500 rounded-xl">
                {children}
            </div>
        </div>
    )
}
