import {useContext, useEffect} from "react";

export default function ChatWidget() {
    const { metadata, setMetadata } = useContext(WidgetContext);

    const { section } = useContext(PlatformFilterContext);

    useEffect(() => {
        setMetadata({ id: 'chat', name: 'Chat', icon: 'fa-regular fa-message-lines', scopes: [{ id: "message" }], platforms: ["youtube", "twitch", "tiktok", "x", "kick"] });
    }, []);

    if (metadata) {
        const { list } = useContext(WidgetProviderContext);

        return (
            <p>test</p>
        )
    }
}
