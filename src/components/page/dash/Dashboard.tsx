import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";
import PreviewWidget from "./widgets/PreviewWidget";
import ChannelWrapper from "../../../wrapper/api/Channel";
import PlatformWrapper from "../../../wrapper/api/Platform";
import ViewersWidget from "./widgets/ViewerWidget";
import FeedWidget from "./widgets/FeedWidget";
import LayoutSelector from "./view/LayoutSelector";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    content: 'chat'
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />, <PreviewWidget />, <ViewersWidget />, <FeedWidget />];

    return (
        <ChannelWrapper>
            <PlatformWrapper>
                <LayoutSelector />
                <GridView defaultLayout={layout} widgets={widgets} />
            </PlatformWrapper>
        </ChannelWrapper>
    )
}
