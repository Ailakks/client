import {useState} from "react";
import {clsx} from "clsx";

export default function PasswordInput() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex items-center relative">
            <input type={visible ? 'text' : 'password'} className="main w-full" placeholder="Password" />
            <span onClick={() => setVisible((prevState) => !prevState)} className="absolute cursor-pointer right-2 p-2">
                <i className={clsx(visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye', 'text-white')} />
            </span>
        </div>
    )
}
