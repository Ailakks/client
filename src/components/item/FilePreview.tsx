import {useContext} from "react";
import {ListContext} from "../list/List";
import {AxiosContext} from "../../wrapper/Axios";
import Request from "../query/Request";

export default function FilePreview() {
    const { useClient } = useContext(AxiosContext);
    const { item: { id } } = useContext(ListContext);

    const request = useClient(`file/${id}`);

    return (
        <Request request={request}>
            
        </Request>
    )
}
