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
        <div ref={zone} className={clsx("relative", isDragging && "outline-1 outline-dashed outline-blue-500 bg-blue-900")} onClick={handle} {...child}>
            <div className={clsx("absolute top-0 bottom-0 right-0 left-0 -z-10")} />
            <div className={clsx(isDragging && "pointer-events-none")}>
                {children}
            </div>
        </div>
    );
}
