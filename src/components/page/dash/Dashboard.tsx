import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";
import PreviewWidget from "./widgets/PreviewWidget";
import ChannelWrapper from "../../../wrapper/api/Channel";
import PlatformWrapper from "../../../wrapper/api/Platform";
import ViewersWidget from "./widgets/ViewerWidget";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    row: ['preview', 'viewers']
                },
                {
                    column: ['chat']
                },
                {
                    row: ['viewers']
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />, <PreviewWidget />, <ViewersWidget />];

    return (
        <ChannelWrapper>
            <PlatformWrapper>
                <GridView defaultLayout={layout} widgets={widgets} />
            </PlatformWrapper>
        </ChannelWrapper>
    )
}
