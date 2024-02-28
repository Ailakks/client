import {useEffect, useState} from "react";

export default function Checkbox({ status, change }) {
    const [selected, setSelected] = useState(status);

    useEffect(() => {
        setSelected(status);
    }, [status]);

    useEffect(() => {
        change(selected);
    }, [selected]);

    return (
        <div className="flex items-center justify-center">
            <i className="fa-solid fa-check" />
        </div>
    )
}
