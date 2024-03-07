import {useContext} from "react";
import {ListContext} from "../list/List";
import {AxiosContext} from "../../wrapper/Axios";

export default function FilePreview() {
    const { useClient } = useContext(AxiosContext);
    const { item: { id } } = useContext(ListContext);

    const request = useClient(`file/${id}`);

    return (
        <p>{id}</p>
    )
}
