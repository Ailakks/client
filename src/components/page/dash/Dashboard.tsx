import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";
import PreviewWidget from "./widgets/PreviewWidget";
import ChannelWrapper from "../../../wrapper/api/Channel";
import PlatformWrapper from "../../../wrapper/api/Platform";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    row: ['chat', 'preview']
                },
                {
                    column: ['chat']
                },
                {
                    row: ['chat']
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />, <PreviewWidget />];

    return (
        <ChannelWrapper>
            <PlatformWrapper>
                <GridView defaultLayout={layout} widgets={widgets} />
            </PlatformWrapper>
        </ChannelWrapper>
    )
}
