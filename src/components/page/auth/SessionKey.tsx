import {gql, useLazyQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../wrapper/Apollo";

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
                    <h1>Key required</h1>

                </div>
            </div>
            <div className="flex justify-center space-x-16">
                <a href="">Terms and conditions</a>
                <a href="">Need help?</a>
            </div>
        </div>
    )
}
