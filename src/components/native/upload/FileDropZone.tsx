import {useContext} from "react";
import DropZoneProvider, {DropZoneContext} from "./DropZoneProvider";

export default function FileDropZone({ clickable, action, children }) {
    return (
        <DropZoneProvider clickable={clickable} action={action}>
            <Body>{children}</Body>
        </DropZoneProvider>
    );
};

function Body({ clickable, children }) {
    const { isDragging, child: { onClick, ...child } } = useContext(DropZoneContext);

    const handle = () => {
      if (clickable) {
          onClick();
      }
    };

    return (
        <div className="relative" onClick={handle} {...child}>
            {isDragging && <div className="absolute top-0 bottom-0 right-0 left-0 bg-blue-900 outline-dashed outline-blue-500 outline-2"/>}
            <div className="pointer-events-none">
                {children}
            </div>
        </div>
    );
}
