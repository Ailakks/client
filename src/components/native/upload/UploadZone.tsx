import {useContext} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import FileDropZone from "./FileDropZone";

export default function UploadZone({ clickable, children }) {
    const { upload } = useContext(QueueContext);

    return (
        <FileDropZone clickable={clickable} action={upload}>
            {children}
        </FileDropZone>
    );
};
