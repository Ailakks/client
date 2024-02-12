import {gql, useLazyQuery} from "@apollo/client";
import {setToken} from "../../../wrapper/Apollo";
import Form from "../../query/Form";
import PasswordInput from "../../layout/components/input/PasswordInput";
import LoadStatus from "../../load/LoadStatus";
import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useContext, useEffect} from "react";
import {KeyContext} from "../../../wrapper/logged/Key";
import {useNavigate} from "react-router-dom";

export default function SessionKey() {
    const { data, loading } = useContext(KeyContext);

    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <LoadSpinner />
                <p>Decrypting...</p>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col justify-center items-center space-y-6">
            <LoadSpinner />
            <p>Decrypting...</p>
        </div>
    )
}

function AuthForm() {
    const navigate = useNavigate();

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
