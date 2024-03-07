import {useContext, useEffect, useState} from "react";
import {AxiosContext} from "../../wrapper/Axios";
import Request, {RequestContext} from "../query/Request";
import {ScopesDataContext} from "../context/Scopes";

export default function FilePreview() {
    const { useClient } = useContext(AxiosContext);
    const { data: { id } } = useContext(ScopesDataContext);

    const request = useClient({ url: `file/${id}`, responseType: 'arraybuffer' });

    return (
        <Request request={request}>
            <Body />
        </Request>
    )
}

function Body() {
    const { data } = useContext(RequestContext);
    const { data: { source: { meta: { mime } } } } = useContext(ScopesDataContext);

    const [blob, setBlob] = useState(null);

    useEffect(() => {
        setBlob(URL.createObjectURL(new Blob([data], { type: mime })));
    }, [data]);

    return (
        <iframe src={blob} />
    )
}
