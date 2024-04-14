import ChatWidget from "./widgets/ChatWidget";
import GridView from "./grid/GridView";

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

    const widgets = [<ChatWidget />];

    return (
        <GridView defaultLayout={layout} widgets={widgets} />
    )
}
