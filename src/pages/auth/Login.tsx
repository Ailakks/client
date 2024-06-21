import PasswordInput from "../../layout/components/input/PasswordInput";
import Form from "../../query/Form";
import Input from "../../query/Input";
import {useContext, useEffect} from "react";
import {LanguageContext} from "../../components/wrapper/lang/Language";
import {CookiesContext} from "../../components/wrapper/tool/Cookies";

export default function Login() {
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
        query Login($email: String!, $password: String!) {
            login(payload: {
                email: $email,
                password: $password
            }) {
                token
                __typename
            }
        }`, {
        onCompleted: ({ login: { token } }) => {
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
                    <button className="main w-full space-x-2">
                        <i className="fa-brands fa-google"/>
                        <span>{translate("auth.login.quick.google")}</span>
                    </button>
                    <hr/>
                    <Form className="space-y-2" submit={(variables) => update({variables})}>
                        <Input name="email" type="email" className="main w-full"
                               placeholder={translate("auth.login.form.email.label")} required/>
                        <PasswordInput />
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
                        <a className="text-blue-500" href="/signup">{translate("auth.login.tip.link")}</a>
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
