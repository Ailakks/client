import {useEffect, useState} from "react";
import {clsx} from "clsx";

export default function Checkbox({ status, change, icon }) {
    const [selected, setSelected] = useState(status);

    useEffect(() => {
        setSelected(status);
    }, [status]);

    const handle = (event) => {
        event.stopPropagation();

        const response = change(!status);

        if (response) {
            setSelected((previous) => !previous);
        }
    };

    return (
        <div className={clsx('flex items-center justify-center h-5 aspect-square text-white rounded border-1 border-solid border-gray-300 cursor-pointer', (selected || icon) && 'bg-orange-500 border-none')} onClick={handle}>
            <i className={clsx('text-xs', selected ? 'fa-solid fa-check' : icon)}/>
        </div>
    )
}
