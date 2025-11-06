import {gql, useLazyQuery} from "@apollo/client";
import Form from "../../query/Form";
import PasswordInput from "../../layout/components/input/PasswordInput";
import LoadStatus from "../../load/LoadStatus";
import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useContext, useEffect} from "react";
import {KeyContext} from "../../../wrapper/logged/Key";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../main";
import {CookiesContext} from "../../../wrapper/tool/Cookies";

export default function Key() {
    const { data, loading } = useContext(KeyContext);

    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data]);

    if (loading) {
        return (
            <div className="h-full flex flex-col justify-center items-center space-y-12">
                <i className="text-white text-6xl fa-solid fa-lock" />
                <div className="flex space-x-4">
                    <LoadSpinner />
                    <p>Decrypting...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex justify-center items-center">
                <div className="w-80 space-y-5">
                    <h1>Password required</h1>
                    <p>Your password is required to decrypt files.</p>
                    <hr />
                    <AuthForm />
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

function AuthForm() {
    const navigate = useNavigate();

    const { setToken } = useContext(CookiesContext);

    const [update, { loading }] = useLazyQuery(gql`
        query KeyLogin($password: String!) {
            authKey(payload: {
                key: $password
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: ({ authKey: { token } }) => {
            setToken(token);
            navigate('/');

            refetch();

            window.location.reload();
        },
        onError: () => {
        }
    });

    return (
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
    )
}
