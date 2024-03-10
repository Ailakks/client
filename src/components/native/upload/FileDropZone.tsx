import style from "./style.module.css";

import {useContext} from "react";
import Container from "../../native/display/container";
import FileDropZoneProvider, {FileDropZoneContext} from "./file-drop-zone-provider";

export default function FileDropZone({ clickable, ...props }) {
    return (
        <FileDropZoneProvider {...props}>
            <Content clickable={clickable} {...props} />
        </FileDropZoneProvider>
    );
};

function Content({ clickable, children }) {
    const { wrapper, child: { onClick, ...child } } = useContext(FileDropZoneContext);

    const handle = () => {
      if (clickable) {
          onClick();
      }
    };

    return (
        <div className="" ref={wrapper} onClick={handle} {...child}>
            <div className="" />
            {children}
        </div>
    );
}
