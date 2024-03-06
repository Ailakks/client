import {useContext} from "react";
import {ListContext} from "../list/List";

export default function FilePreview() {
    const { item: { id } } = useContext(ListContext);

    return (
        <p>{id}</p>
    )
}
