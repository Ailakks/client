export default function Login() {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-64 space-y-2">
                <h2>Login</h2>
                <input className="main w-full" placeholder="Email" />
                <input className="main w-full" placeholder="Password" />
                <button className="main">Login</button>
            </div>
        </div>
    )
}
