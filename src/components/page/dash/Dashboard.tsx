import ChatWidget from "./widgets/ChatWidget";
import GridView from "./view/GridView";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    row: [<ChatWidget />, <ChatWidget />]
                },
                {
                    column: [<ChatWidget />]
                },
                {
                    row: [<ChatWidget />]
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />];

    return (
        <GridView />
    )
}
