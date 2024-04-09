import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";

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
        <GridView defaultLayout={layout} widgets={widgets} />
    )
}
