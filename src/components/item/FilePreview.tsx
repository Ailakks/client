import {useContext, useEffect, useState} from "react";
import {ListContext} from "../list/List";
import {AxiosContext} from "../../wrapper/Axios";
import Request, {RequestContext} from "../query/Request";

export default function FilePreview() {
    const { useClient } = useContext(AxiosContext);
    const { item: { id } } = useContext(ListContext);

    const request = useClient({ url: `file/${id}`, responseType: 'arraybuffer' });

    return (
        <Request request={request}>
            <Body />
        </Request>
    )
}

function Body() {
    const { data } = useContext(RequestContext);
    const { item: { source: { meta: { mime } } } } = useContext(ListContext);

    const [blob, setBlob] = useState(null);

    useEffect(() => {
        setBlob(URL.createObjectURL(new Blob([data], { type: mime })));
    }, [data]);

    return (
        <iframe src={blob} />
    )
}
