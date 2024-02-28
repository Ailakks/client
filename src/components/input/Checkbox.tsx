import {useEffect, useState} from "react";
import {clsx} from "clsx";

export default function Checkbox({ icon, status, change }) {
    const [selected, setSelected] = useState(status);

    useEffect(() => {
        setSelected(status);
    }, [status]);

    const handle = () => {
      setSelected((previous) => {
          change(!previous);

          return !previous;
      });
    };

    return (
        <div className="flex items-center justify-center h-4 w-4 bg-white" onClick={handle}>
            {selected && <i className={clsx('text-blue-700', icon ?? `fa-solid fa-check`)}/>}
        </div>
    )
}
