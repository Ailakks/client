import PasswordInput from "../../layout/components/input/PasswordInput";
import Form from "../../query/Form";
import Input from "../../query/Input";
import {gql, useLazyQuery} from "@apollo/client";
import LoadStatus from "../../load/LoadStatus";
import LoadSpinner from "../../load/spinner/LoadSpinner";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AccountContext} from "../../../wrapper/Account";
import {CookiesContext} from "../../../wrapper/tool/Cookies";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

export default function Signup() {
    const { translate } = useContext(LanguageContext);

    const navigate = useNavigate();

    const { setToken } = useContext(CookiesContext);

    const { data } = useContext(AccountContext);

    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data]);

    const [update, { loading }] = useLazyQuery(gql`
        query Signup($name: String!, $email: String!, $password: String!) {
            signup(payload: {
                name: $name,
                email: $email,
                password: $password
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: ({ signup: { token } }) => {
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
                    <h1>{translate("auth.signup.title")}</h1>
                    <button className="main w-full space-x-2">
                        <i className="fa-brands fa-google" />
                        <span>{translate("auth.signup.quick.google")}</span>
                    </button>
                    <hr />
                    <Form className="space-y-2" submit={(variables) => update({ variables })}>
                        <Input name="name" type="text" className="main w-full" placeholder={translate("auth.signup.form.name.label")} required />
                        <Input name="email" type="email" className="main w-full" placeholder={translate("auth.signup.form.email.label")} required />
                        <PasswordInput />
                        <LoadStatus loading={loading} loader={
                            <div className="flex items-center justify-center space-x-4">
                                <LoadSpinner />
                                <p>{translate("auth.form.continue.loading")}</p>
                            </div>
                        }>
                            <button type="submit" className="main w-full">{translate("auth.signup.form.submit.label")}</button>
                        </LoadStatus>
                    </Form>
                    <hr />
                    <div className="text-center space-x-2">
                        <span className="text-white">{translate("auth.signup.tip.label")}</span>
                        <a className="text-blue-500" href="/login">{translate("auth.signup.tip.link")}</a>
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
