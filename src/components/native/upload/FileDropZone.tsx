import {useContext} from "react";
import DropZoneProvider, {DropZoneContext} from "./DropZoneProvider";
import {clsx} from "clsx";

export default function FileDropZone({ clickable, action, children }) {
    return (
        <DropZoneProvider clickable={clickable} action={action}>
            <Body>{children}</Body>
        </DropZoneProvider>
    );
};

function Body({ clickable, children }) {
    const { wrapper, isDragging, child: { onClick, ...child } } = useContext(DropZoneContext);

    const handle = () => {
      if (clickable) {
          onClick();
      }
    };

    return (
        <div className={clsx(isDragging && "bg-blue-900 border-dashed border-blue-500 border-2")} ref={wrapper} onClick={handle} {...child}>
            {children}
        </div>
    );
}
