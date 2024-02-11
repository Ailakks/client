import PasswordInput from "../../layout/components/input/PasswordInput";
import Form from "../../query/form";
import Input from "../../query/input";

export default function Login() {
    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex justify-center items-center">
                <div className="w-80 space-y-5">
                    <h1>Login</h1>
                    <button className="main w-full space-x-2">
                        <i className="fa-brands fa-google" />
                        <span>Continue with Google</span>
                    </button>
                    <hr />
                    <Form className="space-y-2">
                        <Input type="email" className="main w-full" placeholder="Email" />
                        <PasswordInput />
                        <input type="submit" className="main w-full" value="Login" />
                    </Form>
                    <a className="flex justify-center text-blue-700" href="">Forgot your password?</a>
                    <hr />
                    <div className="text-center space-x-2">
                        <span className="text-white">No registered yet?</span>
                        <a className="text-blue-500" href="">Get started</a>
                    </div>
                </div>
            </div>
            <div className="flex justify-center space-x-16">
                <a href="">Terms and conditions</a>
                <a href="">Need help?</a>
            </div>
        </div>
    )
}
