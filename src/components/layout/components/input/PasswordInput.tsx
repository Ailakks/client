export default function PasswordInput() {
    return (
        <div className="flex items-center relative">
            <input type="password" className="main w-full" placeholder="Password" />
            <button className="absolute cursor-pointer right-2 p-2">
                <i className="fa-regular fa-eye" />
            </button>
        </div>
    )
}
