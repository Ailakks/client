import {useContext} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import FileDropZone from "./FileDropZone";
import {QueryContext} from "../../query/Query";

export default function UploadZone({ clickable, children }) {
    const { data: { getFolder: { id } } } = useContext(QueryContext);
    const { upload } = useContext(QueueContext);

    const handle = (files) => {
        upload(id, files);
    }

    return (
        <FileDropZone clickable={clickable} action={handle}>
            {children}
        </FileDropZone>
    );
};
