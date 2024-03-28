import {useParams} from "react-router-dom";
import Folder from "../data/Folder";

export default function FolderPage() {
    const { id } = useParams();

    return (
        <Folder id={id} query={{ filter: { removed: false } }} />
    );
}