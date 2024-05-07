import {useContext, useState} from "react";
import {clsx} from "clsx";
import Input from "../../../query/Input";
import {LanguageContext} from "../../../../wrapper/lang/Language";

export default function PasswordInput() {
    const { translate } = useContext(LanguageContext);

    const [visible, setVisible] = useState(false);

    return (
        <div className="flex items-center relative">
            <Input name="password" type={visible ? 'text' : 'password'} className="main w-full" placeholder={translate("auth.password.label")} required />
            <span onClick={() => setVisible((prevState) => !prevState)} className="absolute cursor-pointer right-2 p-2">
                <i className={clsx(visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye', 'text-white')} />
            </span>
        </div>
    )
}
