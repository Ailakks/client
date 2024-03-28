export default function NotFoundFallback() {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <h2>Nothing could be found here!</h2>
            <a href="/">Go home</a>
        </div>
    )
}