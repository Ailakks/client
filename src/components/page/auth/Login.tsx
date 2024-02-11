import PasswordInput from "../../layout/components/input/PasswordInput";
import Form from "../../query/Form";
import Input from "../../query/Input";
import {gql, useLazyQuery} from "@apollo/client";
import LoadStatus from "../../load/LoadStatus";

export default function Login() {
    const [update, { loading }] = useLazyQuery(gql`
        query KeyLogin($email: String!, $password: String!) {
            keyLogin(payload: {
                email: $email,
                password: $password
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: () => {
        },
        onError: () => {
        }
    });

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
                    <Form className="space-y-2" submit={(variables) => update({ variables })}>
                        <Input name="email" type="email" className="main w-full" placeholder="Email" />
                        <PasswordInput />
                        <LoadStatus loading={loading}>
                            <button type="submit" className="main w-full">Login</button>
                        </LoadStatus>
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
