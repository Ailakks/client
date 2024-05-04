import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";
import PreviewWidget from "./widgets/PreviewWidget";
import ChannelWrapper from "../../../wrapper/api/Channel";
import PlatformWrapper from "../../../wrapper/api/Platform";
import ViewersWidget from "./widgets/ViewsWidget";
import FeedWidget from "./widgets/FeedWidget";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    child: [
                        {
                            row: [
                                {
                                    content: 'preview'
                                },
                                {
                                    content: 'views'
                                }
                            ]
                        }
                    ]
                },
                {
                    content: 'chat'
                },
                {
                    content: 'feed'
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />, <PreviewWidget />, <ViewersWidget />, <FeedWidget />];

    return (
        <ChannelWrapper>
            <PlatformWrapper>
                <GridView defaultLayout={layout} widgets={widgets} />
            </PlatformWrapper>
        </ChannelWrapper>
    )
}
