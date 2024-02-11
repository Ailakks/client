import {gql, useLazyQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../wrapper/Apollo";
import Form from "../../query/Form";
import Input from "../../query/Input";
import PasswordInput from "../../layout/components/input/PasswordInput";
import LoadStatus from "../../load/LoadStatus";
import LoadSpinner from "../../load/spinner/LoadSpinner";

export default function SessionKey() {
    const navigate = useNavigate();

    const [update, { loading }] = useLazyQuery(gql`
        query KeyLogin($key: String!) {
            authKey(payload: {
                key: $key
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: ({ authKey: { token } }) => {
            setToken(token);
            navigate('/');

            window.location.reload();
        },
        onError: () => {
        }
    });

    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex justify-center items-center">
                <div className="w-80 space-y-5">
                    <h1>Password required</h1>
                    <p>Your password is required to decrypt files.</p>
                    <hr />
                    <Form className="space-y-2" submit={(variables) => update({ variables })}>
                        <PasswordInput />
                        <LoadStatus loading={loading} loader={
                            <div className="flex items-center justify-center space-x-4">
                                <LoadSpinner />
                                <p>Decrypting...</p>
                            </div>
                        }>
                            <button type="submit" className="main w-full">Continue</button>
                        </LoadStatus>
                    </Form>
                    <a className="flex justify-center text-blue-700" href="">Forgot your password?</a>
                </div>
            </div>
            <div className="flex justify-center space-x-16">
                <a href="">Terms and conditions</a>
                <a href="">Need help?</a>
            </div>
        </div>
    )
}
