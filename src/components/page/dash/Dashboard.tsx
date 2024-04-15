import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";
import PreviewWidget from "./widgets/PreviewWidget";
import ChannelWrapper from "../../../wrapper/api/Channel";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    row: ['chat', 'chat']
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
            <GridView defaultLayout={layout} widgets={widgets} />
        </ChannelWrapper>
    )
}
