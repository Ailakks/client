import {useContext} from "react";
import DropZoneProvider, {DropZoneContext} from "./DropZoneProvider";
import {clsx} from "clsx";

export default function FileDropZone({ clickable, action, children }) {
    return (
        <DropZoneProvider action={action}>
            <Body clickable={clickable}>{children}</Body>
        </DropZoneProvider>
    );
};

function Body({ clickable, children }) {
    const { zone, isDragging, child: { onClick, ...child } } = useContext(DropZoneContext);

    const handle = () => {
        if (clickable) {
            onClick();
        }
    };

    return (
        <div className={clsx(isDragging && "bg-blue-900 outline-dashed outline-blue-500 outline-2", clickable && "cursor-pointer")} ref={zone} onClick={handle} {...child}>
            {children}
        </div>
    );
}
