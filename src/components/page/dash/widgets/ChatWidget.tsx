import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import PlatformFilter from "../item/PlatformFilter";
import {DataFilterContext} from "../item/DataFilter";
import {clsx} from "clsx";
import NoContentFallback from "../../fallback/NoContentFallback";

export default function ChatWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'chat', name: 'Chat', icon: 'fa-regular fa-message-lines', scopes: ["message"], platforms: ["youtube", "twitch", "tiktok", "x", "kick"] });
    }, []);

    if (metadata) {
        return (
            <WidgetSocket>
                <Body />
            </WidgetSocket>
        )
    }
}

function Body() {
    const { list } = useContext(WidgetSocketContext);

    return (
        <PlatformFilter data={list}>
            <MessageList />
        </PlatformFilter>
    )
}

function MessageList() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <List list={filtered} fallback={<NoContentFallback />}>
            <Message />
        </List>
    )
}

function Message() {
    const { item: { meta: { platform: { brand } }, data: { author: { color, displayName, badges }, message } } } = useContext(ListContext);

    return (
        <div>
            <i className={clsx(brand.icon.id, "w-6")} />&nbsp;
            <span style={{ color: color ?? color }}>{displayName}:&nbsp;</span>
            <List list={message} separator={<span>&nbsp;</span>}>
                <ChatMessagePart />
            </List>
        </div>
    )
}

function ChatMessagePart() {
    const { item } = useContext(ListContext);

    if (item.source) {
        return (
            <ChatMessageEmote />
        );
    }

    return <ChatMessageText />
}

function ChatMessageText() {
    const { item: { text } } = useContext(ListContext);

    return <span className="break-words">{text}</span>
}

function ChatMessageEmote() {
    const { item: { name, source: { url } } } = useContext(ListContext);

    return (
        <span>
            <img className="inline h-5 aspect-square" alt={name} src={url} />
        </span>
    )
}
