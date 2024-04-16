import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {ChannelContext} from "../../../../wrapper/api/Channel";
import List, {ListContext} from "../../../list/List";

export default function PreviewWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'preview', name: 'Preview', icon: 'fa-regular fa-video', scopes: [{ id: "message" }], platforms: ["youtube", "twitch", "tiktok", "x", "kick"] });
    }, []);

    if (metadata) {
        const { data: { channelList } } = useContext(ChannelContext);

        return (
            <div className="space-y-2">
                <List list={channelList}><Frame /></List>
            </div>
        )
    }
}

function Frame() {
    const { item: { data: { stream: { source: { url } } } } } = useContext(ListContext);

    if (!url) {
        return;
    }

    return (
        <iframe src={url} />
    )
}
