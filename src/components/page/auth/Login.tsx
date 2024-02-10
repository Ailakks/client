import PasswordInput from "../../layout/components/input/PasswordInput";

export default function Login() {
    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex justify-center items-center">
                <div className="w-80 space-y-5">
                    <h1>Login</h1>
                    <form className="space-y-2">
                        <input type="email" className="main w-full" placeholder="Email" />
                        <PasswordInput />
                        <input type="submit" className="main w-full" value="Login" />
                    </form>
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
