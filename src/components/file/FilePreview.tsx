import {useContext, useEffect, useState} from "react";
import {AxiosContext} from "../../wrapper/Axios";
import Request, {RequestContext} from "../query/Request";
import {ScopesDataContext} from "../context/Scopes";
import IntegrationMeta from "../item/IntegrationMeta";
import {LanguageContext} from "../../wrapper/lang/LanguageWrapper";

export default function FilePreview() {
    const { translate } = useContext(LanguageContext);

    const { useClient } = useContext(AxiosContext);
    const { item: { id } } = useContext(ScopesDataContext);

    const request = useClient({ url: `file/${id}`, responseType: 'arraybuffer' });

    return (
        <IntegrationMeta name={translate("file.grid.tab.preview.label")}>
            <Request request={request}>
                <Body />
            </Request>
        </IntegrationMeta>
    )
}

function Body() {
    const { data } = useContext(RequestContext);
    const { item: { source: { meta: { mime } } } } = useContext(ScopesDataContext);

    const [blob, setBlob] = useState(null);

    useEffect(() => {
        setBlob(URL.createObjectURL(new Blob([data], { type: mime })));
    }, [data]);

    return (
        <iframe className="flex-1 w-full rounded-md" src={blob} />
    )
}
