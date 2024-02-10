export default function Login() {
    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex justify-center items-center">
                <div className="w-80 space-y-5">
                    <h1>Login</h1>
                    <div className="space-y-2">
                        <input className="main w-full" placeholder="Email" />
                        <input className="main w-full" placeholder="Password" />
                        <button className="main w-full">Login</button>
                    </div>
                    <a className="flex justify-center text-blue-700" href="">Forgot your password?</a>
                    <hr />
                    <p className="text-center">No registered yet? <a className="text-blue-500" href="">Get started</a></p>
                </div>
            </div>
            <div className="flex justify-center space-x-16">
                <a href="">Terms and conditions</a>
                <a href="">Need help?</a>
            </div>
        </div>
    )
}
