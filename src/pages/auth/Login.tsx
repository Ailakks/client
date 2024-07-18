import {useContext, useEffect} from "react";
import {LanguageContext} from "../../components/wrapper/header/LanguageMenu";
import {AxiosContext} from "../../components/wrapper/api/Api";
import {Form} from "../../components/query/Form";
import {Input} from "../../components/query/Input";
import {LoadStatus} from "../../components/load/LoadStatus";
import {PasswordInput} from "../../components/input/PasswordInput";
import {useNavigate} from "react-router-dom";
import {AccountContext} from "../../components/wrapper/account/Account";
import LoadSpinner from "../../components/load/spinner/LoadSpinner";
import {Load} from "./Load";

export function Login() {
    const navigate = useNavigate();

    const { translate } = useContext(LanguageContext);
    const { useClient } = useContext(AxiosContext);
    const { response } = useContext(AccountContext);

    useEffect(() => {
        if (response) {
            navigate('/');
        }
    }, [response]);

    const [{ data, loading }, login] = useClient('auth/login', { manual: true });

    if (data) {
        const { id } = data;

        return <Load id={id} />;
    }

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
                    <Form className="space-y-2" submit={(params) => login({ params })}>
                        <Input name="email" type="email" className="main w-full"
                               placeholder={translate("auth.login.form.email.label")} required/>
                        <PasswordInput />
                        <LoadStatus loading={loading} loader={
                            <div className="inline justify-center">
                                <LoadSpinner />
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
                        <a className="highlight" href="/signup">{translate("auth.login.tip.link")}</a>
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
