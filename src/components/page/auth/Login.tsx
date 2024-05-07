import PasswordInput from "../../layout/components/input/PasswordInput";
import Form from "../../query/Form";
import Input from "../../query/Input";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import LoadStatus from "../../load/LoadStatus";
import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AccountContext} from "../../../wrapper/api/Account";
import {CookiesContext} from "../../../wrapper/tool/Cookies";
import {LanguageContext} from "../../../wrapper/lang/Language";
import Query, {QueryContext} from "../../query/Query";

export default function Login() {
    const {translate} = useContext(LanguageContext);

    const navigate = useNavigate();

    const {setToken} = useContext(CookiesContext);
    const {data} = useContext(AccountContext);

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data]);

    if (code) {
        return (
            <OAuth />
        )
    }

    const [update, {loading}] = useLazyQuery(gql`
        query Login($email: String!, $password: String!) {
            login(payload: {
                email: $email,
                password: $password
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: ({login: {token}}) => {
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
                    <h1>{translate("auth.login.title")}</h1>
                    <GoogleButton/>
                    <hr/>
                    <Form className="space-y-2" submit={(variables) => update({variables})}>
                        <Input name="email" type="email" className="main w-full"
                               placeholder={translate("auth.login.form.email.label")} required/>
                        <PasswordInput/>
                        <LoadStatus loading={loading} loader={
                            <div className="inline justify-center">
                                <LoadSpinner/>
                                <p>{translate("auth.login.form.submit.loading")}</p>
                            </div>
                        }>
                            <button type="submit"
                                    className="main w-full">{translate("auth.login.form.submit.label")}</button>
                        </LoadStatus>
                    </Form>
                    <hr/>
                    <div className="text-center space-x-2">
                        <span className="text-white">{translate("auth.login.tip.label")}</span>
                        <a className="text-orange-500" href="/signup">{translate("auth.login.tip.link")}</a>
                    </div>
                </div>
            </div>
            <div className="flex justify-center space-x-16">
                <a href="">{translate("auth.footer.terms")}</a>
                <a href="">{translate("auth.footer.help")}</a>
            </div>
        </div>
    )
}

function GoogleButton() {
    const {translate} = useContext(LanguageContext);

    const [update, {loading}] = useLazyQuery(gql`
        query Generate {
            generate {
                url
                __typename
            }
        }`, {
        onCompleted: ({generate: {url}}) => {
            window.location.href = url;
        },
        onError: () => {
        }
    });

    return (
        <LoadStatus loading={loading} loader={
            <div className="inline justify-center">
                <LoadSpinner/>
                <p>{translate("auth.login.form.submit.loading")}</p>
            </div>
        }>
            <button className="main w-full space-x-2" onClick={update}>
                <i className="fa-brands fa-google"/>
                <span>{translate("auth.login.quick.google")}</span>
            </button>
        </LoadStatus>
    )
}

function OAuth() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const request = useQuery(gql`
                query Login($code: String!) {
                    login(payload: {
                        code: $code
                    }) {
                        token
                        __typename
                    }
                }`,
        {
            variables: {
                code: code
            }
        });

    return (
        <Query request={request}>
            <OAuthLogin />
        </Query>
    )
}

function OAuthLogin() {
    const { translate } = useContext(LanguageContext);

    const { data: { login: { token } } } = useContext(QueryContext);

    const navigate = useNavigate();

    const { setToken } = useContext(CookiesContext);

    useEffect(() => {
        setToken(token);
        navigate('/');

        window.location.reload();
    }, [token]);

    return (
        <div className="h-full flex justify-center items-center">
            <p>{translate("auth.login.oauth.loading")}</p>
        </div>
    )
}
