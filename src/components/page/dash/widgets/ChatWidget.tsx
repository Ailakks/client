import {useContext, useEffect} from "react";
import {WidgetsContext} from "../grid/GridView";

export default function ChatWidget() {
    const { metadata, setMetadata } = useContext(WidgetsContext);

    useEffect(() => {
        setMetadata({ id: 'chat', name: 'Chat', icon: 'fa-regular fa-message-lines', scopes: [{ id: "message" }], platforms: ["youtube", "twitch", "tiktok", "x", "kick"] });
    }, []);

    if (metadata) {
        return (
            <p>test</p>
        )
    }
}
