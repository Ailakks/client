import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";

export default function PreviewWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({
            id: 'preview',
            name: 'Preview',
            icon: 'fa-regular fa-video',
            scopes: [{id: "message"}],
            platforms: ["youtube", "twitch", "tiktok", "x", "kick"]
        });
    }, []);

    return (
        <p>test</p>
    )
}

function Body() {

}
