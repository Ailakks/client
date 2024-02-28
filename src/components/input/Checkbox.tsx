import {useEffect, useState} from "react";
import {clsx} from "clsx";

export default function Checkbox({ status, change, icon }) {
    const [selected, setSelected] = useState(status);

    useEffect(() => {
        setSelected(status);
    }, [status]);

    const handle = () => {
        const response = change(!status);

        if (response) {
            setSelected((previous) => !previous);
        }
    };

    return (
        <div className="flex items-center justify-center h-4 w-4 bg-white" onClick={handle}>
            <i className={clsx('text-blue-700', icon ?? `fa-solid fa-check`)}/>
        </div>
    )
}
