import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";

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
        <List list={list}>
            <Item />
        </List>
    )
}

function Item() {
    const { item } = useContext(ListContext);
}