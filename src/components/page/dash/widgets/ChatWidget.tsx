import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import PlatformFilter from "../item/PlatformFilter";
import {DataFilterContext} from "../item/DataFilter";
import {clsx} from "clsx";

export default function ChatWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'chat', name: 'Chat', icon: 'fa-regular fa-message-lines', scopes: [{ id: "message" }], platforms: ["youtube", "twitch", "tiktok", "x", "kick"] });
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
        <div className="grow">
            <List list={filtered}>
                <Message />
            </List>
        </div>
    )
}

function Message() {
    const { item: { meta: { platform: { brand: { icon } } }, data: { author: { color, displayName, badges }, message } } } = useContext(ListContext);

    return (
        <div>
            <i className={clsx(icon.id, "w-6")} />&nbsp;
            <span style={{ color: color ?? brand.color }}>{displayName}:&nbsp;</span>
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

    return <span>{text}</span>
}

function ChatMessageEmote() {
    const { item: { name, source: { url } } } = useContext(ListContext);

    return (
        <span>
            <img className="inline" alt={name} src={url} />
        </span>
    )
}